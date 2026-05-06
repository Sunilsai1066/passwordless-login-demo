from fastapi import APIRouter
from app.utils.encoding import convert_bytes
from fido2.utils import websafe_encode
from app.fido_server import server
from app.storage import users, authentication_challenges


router = APIRouter()


@router.post("/authenticate/begin")
async def authenticate_begin(payload: dict):

    print("\n========== AUTHENTICATE BEGIN ==========")

    username = payload["username"]

    print(f"Username: {username}")

    user = users.get(username)

    print("\nLoaded User")

    print(user)

    if not user:
        return {
            "status": "error",
            "message": "User not found"
        }

    auth_data, state = server.authenticate_begin(
        credentials=[
            user["credential_data"]
        ]
    )

    authentication_challenges[username] = state

    print("\nStored Authentication Challenge")

    print(authentication_challenges)

    print("\n========================================\n")

    auth_data = convert_bytes(
        dict(auth_data)
    )

    return auth_data


@router.post("/authenticate/complete")
async def authenticate_complete(payload: dict):

    print("\n========== AUTHENTICATE COMPLETE ==========")

    print(payload)

    return {
        "status": "ok"
    }