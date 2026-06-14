/**
 * Crea una sesión de Stripe Checkout para el Plan Familia.
 * POST { authUserId, email }
 *
 * Env vars necesarias en Vercel:
 *   STRIPE_SECRET_KEY, STRIPE_PRICE_ID, NEXT_PUBLIC_APP_URL (o APP_URL)
 */

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe     = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase   = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const APP_URL    = process.env.APP_URL || 'https://trainclub.vercel.app'
const PRICE_ID   = process.env.STRIPE_PRICE_ID

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { authUserId, email } = req.body
  if (!authUserId) return res.status(400).json({ error: 'Missing authUserId' })

  // Buscar o crear cliente Stripe
  let stripeCustomerId = null
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('auth_user_id', authUserId)
    .maybeSingle()

  if (sub?.stripe_customer_id) {
    stripeCustomerId = sub.stripe_customer_id
  } else if (email) {
    const customer = await stripe.customers.create({ email, metadata: { authUserId } })
    stripeCustomerId = customer.id
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: stripeCustomerId || undefined,
    customer_email: !stripeCustomerId ? email : undefined,
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    success_url: `${APP_URL}/?upgrade=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${APP_URL}/?upgrade=cancel`,
    metadata: { authUserId },
    locale: 'es',
    allow_promotion_codes: true,
  })

  return res.status(200).json({ url: session.url })
}
