from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .data.fetch_prices import get_binance_price, get_kraken_price, find_arbitrage, get_prices

app = FastAPI()

# Enable CORS for all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/opportunities")
def get_opportunities():
    prices = get_prices()
    print("[DEBUG] API prices:", prices)
    opportunities = find_arbitrage(prices)
    print("[DEBUG] API opportunities:", opportunities)
    return opportunities
