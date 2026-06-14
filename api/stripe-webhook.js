/**
 * Webhook de Stripe — actualiza el estado de suscripción en Supabase.
 * Configura en Stripe Dashboard → Webhooks → Endpoint URL:
 *   https://trainclub.vercel.app/api/stripe-webhook
 * Eventos a escuchar:
 *   checkout.session.completed
 *   customer.subscription.updated
 *   customer.subscription.deleted
 */

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const sig     = req.headers['stripe-signature']
  const rawBody = await getRawBody(req)
  let event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (e) {
    return res.status(400).json({ error: `Webhook error: ${e.message}` })
  }

  const upsertSub = async (stripeSubId, customerId, status, periodEnd) => {
    // Buscar authUserId desde metadata del customer
    const customer = await stripe.customers.retrieve(customerId)
    const authUserId = customer.metadata?.authUserId
    if (!authUserId) return

    await supabase.from('subscriptions').upsert({
      auth_user_id:           authUserId,
      stripe_customer_id:     customerId,
      stripe_subscription_id: stripeSubId,
      plan:                   'familia',
      status,
      valid_until:            periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      updated_at:             new Date().toISOString(),
    }, { onConflict: 'auth_user_id' })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.mode === 'subscription') {
      const sub = await stripe.subscriptions.retrieve(session.subscription)
      await upsertSub(sub.id, session.customer, 'active', sub.current_period_end)
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object
    const status = sub.status === 'active' || sub.status === 'trialing' ? 'active' : 'canceled'
    await upsertSub(sub.id, sub.customer, status, sub.current_period_end)
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object
    await upsertSub(sub.id, sub.customer, 'canceled', null)
  }

  return res.status(200).json({ received: true })
}
