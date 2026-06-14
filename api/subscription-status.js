/**
 * Devuelve el estado de suscripción de un usuario.
 * GET /api/subscription-status?authUserId=xxx
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { authUserId } = req.query
  if (!authUserId) return res.status(400).json({ error: 'Missing authUserId' })

  const { data } = await supabase
    .from('subscriptions')
    .select('plan, status, valid_until')
    .eq('auth_user_id', authUserId)
    .maybeSingle()

  const active = data?.status === 'active' &&
    (!data.valid_until || new Date(data.valid_until) > new Date())

  return res.status(200).json({
    plan:    active ? (data?.plan || 'familia') : 'free',
    active,
    validUntil: data?.valid_until || null,
  })
}
