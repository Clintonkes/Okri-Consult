export const API_URL = import.meta.env.VITE_API_URL || '/api/v1'

export const api = {
  get: async (endpoint, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
    if (!res.ok) throw await res.json()
    return await res.json()
  },
  
  post: async (endpoint, data, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw await res.json()
    return await res.json()
  },
  
  put: async (endpoint, data, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw await res.json()
    return await res.json()
  },
  
  delete: async (endpoint, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
    if (!res.ok) throw await res.json()
    return await res.json()
  },
  
  patch: async (endpoint, data, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw await res.json()
    return await res.json()
  }
}
