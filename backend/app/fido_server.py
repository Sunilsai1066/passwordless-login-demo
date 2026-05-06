from fido2.server import Fido2Server
from fido2.webauthn import PublicKeyCredentialRpEntity

rp = PublicKeyCredentialRpEntity(
    id="localhost",
    name="Passwordless Demo"
)

server = Fido2Server(rp)