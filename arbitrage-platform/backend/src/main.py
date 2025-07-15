from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .data.fetch_prices import get_binance_price, get_kraken_price, find_arbitrage

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
    prices = {
        'BTC/USD': {
            'binance': get_binance_price('BTCUSDT'),
            'kraken': get_kraken_price('XBTUSD')
        }
    }
    opportunities = find_arbitrage(prices)
    return opportunities
