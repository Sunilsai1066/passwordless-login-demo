from fido2.utils import websafe_encode, websafe_decode

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