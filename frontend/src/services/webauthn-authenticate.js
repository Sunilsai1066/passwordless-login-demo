import {
  bufferToBase64url,
  base64urlToBuffer
} from './encoding'

import {
  authenticateBegin,
  authenticateComplete
} from './api'

export async function authenticateUser(
  username
) {

  if (!window.PublicKeyCredential) {
    throw new Error(
      'WebAuthn is not supported'
    )
  }

  if (!username) {
    throw new Error(
      'Username required'
    )
  }

  /*
    STEP 1
    GET AUTH OPTIONS
  */

  const authenticationOptions =
    await authenticateBegin(
      username
    )

  console.log(
    'AUTH OPTIONS'
  )

  console.log(authenticationOptions)

  const publicKey =
    authenticationOptions.publicKey

  /*
    Convert challenge
  */

  publicKey.challenge =
    base64urlToBuffer(
      publicKey.challenge
    )

  /*
    Convert credential IDs
  */

  publicKey.allowCredentials =
    publicKey.allowCredentials.map(
      (credential) => ({
        ...credential,

        id: base64urlToBuffer(
          credential.id
        )
      })
    )

  /*
    STEP 2
    AUTHENTICATE
  */

  const assertion =
    await navigator.credentials.get({
      publicKey
    })

  console.log(
    'AUTH ASSERTION'
  )

  console.log(assertion)

  /*
    STEP 3
    SEND ASSERTION
    TO BACKEND
  */

  const assertionPayload = {

    id: assertion.id,

    rawId: bufferToBase64url(
      assertion.rawId
    ),

    type: assertion.type,

    response: {

      clientDataJSON:
        bufferToBase64url(
          assertion.response.clientDataJSON
        ),

      authenticatorData:
        bufferToBase64url(
          assertion.response.authenticatorData
        ),

      signature:
        bufferToBase64url(
          assertion.response.signature
        )
    }
  }

  const result =
    await authenticateComplete(
      username,
      assertionPayload
    )

  console.log(
    'AUTH COMPLETE RESULT'
  )

  console.log(result)

  return result
}