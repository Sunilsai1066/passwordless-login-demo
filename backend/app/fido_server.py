from app.config import RP_ID
from fido2.server import Fido2Server
from fido2.webauthn import PublicKeyCredentialRpEntity

rp = PublicKeyCredentialRpEntity(
    id=RP_ID,
    name="Passwordless Demo"
)

server = Fido2Server(rp)