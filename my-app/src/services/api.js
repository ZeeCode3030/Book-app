const BASE = 'http://localhost:5000/api'

function getToken() {
  return localStorage.getItem('booked_token')
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
}

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong.')
  return data
}

export const authApi = {
  register: (username, password) =>
    fetch(`${BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handleResponse),

  login: (username, password) =>
    fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handleResponse),
}

export const booksApi = {
  getAll: () =>
    fetch(`${BASE}/books`, { headers: authHeaders() }).then(handleResponse),

  add: (book) =>
    fetch(`${BASE}/books`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(book),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE}/books/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handleResponse),
}
