import { useState, useEffect } from 'react'

export const PLAN_LIMITS = { free: 1, familia: 5 }

export function useSubscription(authUserId) {
  const [plan, setPlan]       = useState('free')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authUserId) { setPlan('free'); setLoading(false); return }

    fetch(`/api/subscription-status?authUserId=${authUserId}`)
      .then(r => r.json())
      .then(d => { setPlan(d.active ? d.plan : 'free') })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [authUserId])

  async function startCheckout(email) {
    const res = await fetch('/api/stripe-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authUserId, email }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return { plan, loading, maxProfiles: PLAN_LIMITS[plan] || 1, startCheckout }
}
