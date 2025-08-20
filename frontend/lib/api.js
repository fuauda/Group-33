export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:5000'

export function getAuthToken() {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const headers = new Headers(options.headers || {})

  // Ensure JSON by default
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json')
  }

  // Attach Authorization if token exists
  const token = getAuthToken()
  if (token && !headers.has('Authorization')) {
    const value = token.startsWith('Bearer ') ? token : `Bearer ${token}`
    headers.set('Authorization', value)
  }

  const res = await fetch(url, { ...options, headers })
  return res
}

export async function getCurrentUser() {
  try {
    const res = await apiFetch('/api/auth/me', { method: 'GET' })
    if (!res.ok) return null
    const user = await res.json().catch(() => null)
    return user || null
  } catch {
    return null
  }
}

export async function logoutRequest() {
  try {
    const res = await apiFetch('/api/auth/logout', { method: 'POST' })
    return res
  } catch (e) {
    return null
  }
}

export function clearAuthToken() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem('token')
  } catch {}
}


