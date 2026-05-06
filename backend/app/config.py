import os

from dotenv import load_dotenv

load_dotenv()

RP_ID = os.getenv("RP_ID", "localhost")

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
