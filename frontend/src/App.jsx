import { useState } from 'react'
import { registerUser } from './services/webauthn-register'
import { authenticateUser } from './services/webauthn-authenticate'

export default function App() {
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('Ready')

  async function handleRegister() {
    try {
      setStatus('Starting registration...')

      const result = await registerUser(username)

      console.log('REGISTER RESULT')
      console.log(result)

      setStatus('Registration successful')
    } catch (error) {
      console.error(error)
      setStatus(`Registration failed: ${error.message}`)
    }
  }

  async function handleAuthenticate() {
    try {
      setStatus('Starting authentication...')

      const result = await authenticateUser(username)

      console.log('AUTH RESULT')
      console.log(result)

      setStatus('Authentication successful')
    } catch (error) {
      console.error(error)
      setStatus(`Authentication failed: ${error.message}`)
    }
  }

  return (
    <div className="container">
      <h1>Passwordless Login Demo</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="button-group">
        <button onClick={handleRegister}>
          Register
        </button>

        <button onClick={handleAuthenticate}>
          Authenticate
        </button>
      </div>

      <div className="status-box">
        {status}
      </div>
    </div>
  )
}