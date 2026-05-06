from fastapi import APIRouter
from fido2.webauthn import PublicKeyCredentialUserEntity,RegistrationResponse
from fido2.utils import websafe_encode, websafe_decode

from app.fido_server import server
from app.storage import (
    users,
    registration_challenges
)

router = APIRouter()


def convert_bytes(obj):

    if isinstance(obj, bytes):
        return websafe_encode(obj)

    if isinstance(obj, dict):
        return {
            key: convert_bytes(value)
            for key, value in obj.items()
        }

    if isinstance(obj, list):
        return [
            convert_bytes(item)
            for item in obj
        ]

    return obj


@router.post("/register/begin")
async def register_begin(payload: dict):

    print("\n========== REGISTER BEGIN ==========")

    username = payload["username"]

    print(f"Username: {username}")

    user = PublicKeyCredentialUserEntity(
        id=username.encode(),
        name=username,
        display_name=username
    )

    registration_data, state = server.register_begin(
        user=user,
        credentials=[]
    )

    registration_challenges[username] = state

    print("\nGenerated Registration Challenge")

    print("\nStored Challenges:")
    print(registration_challenges)

    print("\n===================================\n")

    registration_data = convert_bytes(
        dict(registration_data)
    )

    return registration_data


@router.post("/register/complete")
async def register_complete(payload: dict):

    print("\n========== REGISTER COMPLETE ==========")

    username = payload["username"]

    credential = payload["credential"]

    print(f"Username: {username}")

    print("\nReceived Credential")

    print(credential)

    state = registration_challenges[username]

    registration_response = RegistrationResponse.from_dict({
        "id": credential["id"],
        "rawId": credential["rawId"],
        "type": credential["type"],
        "response": {
            "clientDataJSON":
                websafe_decode(
                    credential["response"]["clientDataJSON"]
                ),

            "attestationObject":
                websafe_decode(
                    credential["response"]["attestationObject"]
                )
        }
    })

    auth_data = server.register_complete(
        state,
        registration_response
    )

    users[username] = {
        "credential_data":
            auth_data.credential_data,

        "sign_count": 0
    }

    print("\nUSER REGISTERED SUCCESSFULLY")

    print("\nStored Users:")

    print(users)

    print("\n======================================\n")

    return {
        "status": "ok",
        "message": "Registration complete"
    }