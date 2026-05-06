const API_BASE_URL = 'http://127.0.0.1:8000'

export async function registerBegin(username) {

  const response = await fetch(
    `${API_BASE_URL}/register/begin`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        username
      })
    }
  )

  if (!response.ok) {
    throw new Error('Register begin failed')
  }

  return response.json()
}

export async function registerComplete(
  username,
  credential
) {

  const response = await fetch(
    `${API_BASE_URL}/register/complete`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        username,
        credential
      })
    }
  )

  if (!response.ok) {
    throw new Error(
      'Register complete failed'
    )
  }

  return response.json()
}

export async function authenticateBegin(
  username
) {

  const response = await fetch(
    `${API_BASE_URL}/authenticate/begin`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        username
      })
    }
  )

  if (!response.ok) {
    throw new Error(
      'Authenticate begin failed'
    )
  }

  return response.json()
}


export async function authenticateComplete(
  username,
  credential
) {

  const response = await fetch(
    `${API_BASE_URL}/authenticate/complete`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        username,
        credential
      })
    }
  )

  if (!response.ok) {
    throw new Error(
      'Authenticate complete failed'
    )
  }

  return response.json()
}