import {
  bufferToBase64url,
  base64urlToBuffer
} from './encoding'

import {
  registerBegin,
  registerComplete
} from './api'

export async function registerUser(username) {

  if (!window.PublicKeyCredential) {
    throw new Error(
      'WebAuthn not supported'
    )
  }

  if (!username) {
    throw new Error(
      'Username required'
    )
  }

  /*
    STEP 1
    GET CHALLENGE
  */

  const registrationOptions =
    await registerBegin(username)

  console.log(
    'REGISTRATION OPTIONS'
  )

  console.log(registrationOptions)

  const publicKey =
    registrationOptions.publicKey

  /*
    Convert base64url -> ArrayBuffer
  */

  publicKey.challenge =
    base64urlToBuffer(
      publicKey.challenge
    )

  publicKey.user.id =
    base64urlToBuffer(
      publicKey.user.id
    )

  /*
    STEP 2
    CREATE CREDENTIAL
  */

  const credential =
    await navigator.credentials.create({
      publicKey
    })

  console.log(
    'CREATED CREDENTIAL'
  )

  console.log(credential)

  /*
    STEP 3
    SEND TO BACKEND
  */

  const credentialPayload = {

    id: credential.id,

    rawId: bufferToBase64url(
      credential.rawId
    ),

    type: credential.type,

    response: {

      clientDataJSON:
        bufferToBase64url(
          credential.response.clientDataJSON
        ),

      attestationObject:
        bufferToBase64url(
          credential.response.attestationObject
        )
    }
  }

  const result =
    await registerComplete(
      username,
      credentialPayload
    )

  console.log(
    'REGISTER COMPLETE RESULT'
  )

  console.log(result)

  return result
}