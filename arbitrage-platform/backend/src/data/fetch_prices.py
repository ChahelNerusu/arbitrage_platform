import itertools

# --- FOREX SUPPORT ---
CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"]

def get_live_mid_rates(base="USD", symbols=None):
    params = {"base": base}
    if symbols:
        params["symbols"] = ",".join(symbols)
    resp = requests.get("https://api.exchangerate.host/latest", params=params)
    resp.raise_for_status()
    data = resp.json()
    if not data.get("success", True):
        raise RuntimeError("FX API error: " + str(data))
    return data["rates"]

def build_pair_rates(mid_rates, base="USD"):
    pair_rates = {}
    mid = mid_rates.copy()
    mid[base] = 1.0
    for a, b in itertools.permutations(mid.keys(), 2):
        rate = mid[b] / mid[a]
        pair_rates[f"{a}/{b}"] = rate
    return pair_rates

def find_triangular_arbitrage(rates, start_amount=1.0, min_profit_pct=0.0):
    opportunities = []
    currencies = set()
    for pair in rates:
        a, b = pair.split("/")
        currencies.update([a, b])
    currencies = list(currencies)
    for a, b, c in itertools.permutations(currencies, 3):
        p1, p2, p3 = f"{a}/{b}", f"{b}/{c}", f"{c}/{a}"
        if p1 not in rates or p2 not in rates or p3 not in rates:
            continue
        amt_b = start_amount * rates[p1]
        amt_c = amt_b * rates[p2]
        amt_a = amt_c * rates[p3]
        profit_pct = (amt_a - start_amount) / start_amount * 100
        if profit_pct > min_profit_pct:
            opportunities.append({
                "asset": f"{a}/{b}/{c}",
                "assetType": "forex",
                "buyFrom": f"{a}->{b}",
                "sellTo": f"{b}->{c}->{a}",
                "profitMargin": round(profit_pct, 4),
                "country": "Global",
                "cycle": (a, b, c, a),
                "start": start_amount,
                "end": round(amt_a, 6),
            })
    return sorted(opportunities, key=lambda x: x["profitMargin"], reverse=True)
import os
import requests

def get_binance_price(symbol='BTCUSDT'):
    url = f'https://api.binance.com/api/v3/ticker/price?symbol={symbol}'
    return float(requests.get(url).json()['price'])

def get_yahoo_stock_price(symbol='AAPL'):
    url = f'https://query1.finance.yahoo.com/v7/finance/quote?symbols={symbol}'
    try:
        response = requests.get(url, timeout=5)
        if response.status_code != 200:
            return None
        data = response.json()
        if not data['quoteResponse']['result']:
            return None
        return float(data['quoteResponse']['result'][0]['regularMarketPrice'])
    except Exception:
        return None

def get_alpha_vantage_stock_price(symbol='AAPL'):
    api_key = os.environ.get('ALPHA_VANTAGE_API_KEY', '')
    if not api_key:
        return None  # Or raise error/log warning
    url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api_key}'
    response = requests.get(url)
    data = response.json()
    try:
        return float(data['Global Quote']['05. price'])
    except Exception:
        return None

def get_kraken_price(pair='XBTUSD'):
    url = 'https://api.kraken.com/0/public/Ticker?pair=' + pair
    result = requests.get(url).json()['result']
    return float(list(result.values())[0]['c'][0])

def get_coinbase_price(symbol='BTC-USD'):
    url = f'https://api.coinbase.com/v2/prices/{symbol}/spot'
    return float(requests.get(url).json()['data']['amount'])

def get_prices():
    prices = {
        'BTC/USD': {
            'binance': get_binance_price('BTCUSDT'),
            'kraken': get_kraken_price('XBTUSD'),
            'coinbase': get_coinbase_price('BTC-USD')
        },
        'ETH/USD': {
            'binance': get_binance_price('ETHUSDT'),
            'kraken': get_kraken_price('ETHUSD'),
            'coinbase': get_coinbase_price('ETH-USD')
        },
        'ADA/USD': {
            'binance': get_binance_price('ADAUSDT'),
            'kraken': get_kraken_price('ADAUSD'),
            'coinbase': get_coinbase_price('ADA-USD')
        },
        'SOL/USD': {
            'binance': get_binance_price('SOLUSDT'),
            'kraken': get_kraken_price('SOLUSD'),
            'coinbase': get_coinbase_price('SOL-USD')
        },
        'XRP/USD': {
            'binance': get_binance_price('XRPUSDT'),
            'kraken': get_kraken_price('XRPUSD'),
            'coinbase': get_coinbase_price('XRP-USD')
        },
        'DOGE/USD': {
            'binance': get_binance_price('DOGEUSDT'),
            'kraken': get_kraken_price('DOGEUSD'),
            'coinbase': get_coinbase_price('DOGE-USD')
        },
        'AVAX/USD': {
            'binance': get_binance_price('AVAXUSDT'),
            'kraken': get_kraken_price('AVAXUSD'),
            'coinbase': get_coinbase_price('AVAX-USD')
        },
        'DOT/USD': {
            'binance': get_binance_price('DOTUSDT'),
            'kraken': get_kraken_price('DOTUSD'),
            'coinbase': get_coinbase_price('DOT-USD')
        },
        'TRX/USD': {
            'binance': get_binance_price('TRXUSDT'),
            'kraken': get_kraken_price('TRXUSD'),
            'coinbase': get_coinbase_price('TRX-USD')
        },
        'LTC/USD': {
            'binance': get_binance_price('LTCUSDT'),
            'kraken': get_kraken_price('LTCUSD'),
            'coinbase': get_coinbase_price('LTC-USD')
        },
        'AAPL': {
            'yahoo': get_yahoo_stock_price('AAPL'),
            'alpha_vantage': get_alpha_vantage_stock_price('AAPL') or get_yahoo_stock_price('AAPL')
        },
        'TSLA': {
            'yahoo': get_yahoo_stock_price('TSLA'),
            'alpha_vantage': get_alpha_vantage_stock_price('TSLA') or get_yahoo_stock_price('TSLA')
        }
    }
    # Remove any assets where one or more prices are None
    prices = {k: v for k, v in prices.items() if all(x is not None for x in v.values())}
    # --- Add forex rates as a special key ---
    try:
        print("[DEBUG] Fetching forex rates from Frankfurter API...")
        resp = requests.get("https://api.frankfurter.app/latest", params={"from": "USD", "to": ",".join([c for c in CURRENCIES if c != 'USD'])})
        print(f"[DEBUG] Raw Frankfurter API response: {resp.status_code} {resp.text[:300]}")
        resp.raise_for_status()
        data = resp.json()
        # Frankfurter returns {"amount":1.0,"base":"USD","date":"2024-07-15","rates":{"EUR":0.91,...}}
        mids = data["rates"]
        mids["USD"] = 1.0
        pair_rates = build_pair_rates(mids, base="USD")
        prices['forex_pairs'] = pair_rates
    except Exception as e:
        print(f"[DEBUG] Exception fetching forex rates: {e}")
        prices['forex_pairs'] = {}
    return prices

def find_arbitrage(prices):
    asset_type_map = {
        'BTC/USD': 'crypto',
        'ETH/USD': 'crypto',
        'ADA/USD': 'crypto',
        'SOL/USD': 'crypto',
        'XRP/USD': 'crypto',
        'DOGE/USD': 'crypto',
        'AVAX/USD': 'crypto',
        'DOT/USD': 'crypto',
        'TRX/USD': 'crypto',
        'LTC/USD': 'crypto',
        'AAPL': 'stocks',
        'TSLA': 'stocks',
    }
    opportunities = []
    # Standard arbitrage for crypto/stocks
    for asset, exchanges in prices.items():
        if asset == 'forex_pairs':
            continue
        sorted_ex = sorted(exchanges.items(), key=lambda x: x[1])
        buy_exchange, buy_price = sorted_ex[0]
        sell_exchange, sell_price = sorted_ex[-1]
        profit_pct = ((sell_price - buy_price) / buy_price) * 100
        if profit_pct > 0:
            opportunities.append({
                'asset': asset,
                'assetType': asset_type_map.get(asset, 'other'),
                'buyFrom': buy_exchange.capitalize(),
                'sellTo': sell_exchange.capitalize(),
                'profitMargin': round(profit_pct, 2),
                'country': 'USA',
            })
    # Forex triangular arbitrage
    if 'forex_pairs' in prices and prices['forex_pairs']:
        # Show all cycles, even if not profitable, for frontend testing
        forex_ops = find_triangular_arbitrage(prices['forex_pairs'], start_amount=1000, min_profit_pct=0.0)
        print(f"[DEBUG] Forex cycles found: {len(forex_ops)}")
        if forex_ops:
            print(f"[DEBUG] Sample forex cycle: {forex_ops[0]}")
        else:
            print("[DEBUG] No forex cycles found.")
        # Sort by profitMargin descending
        forex_ops_sorted = sorted(forex_ops, key=lambda x: x['profitMargin'], reverse=True)
        for op in forex_ops_sorted:
            opportunities.append({
                'asset': ' → '.join(op['cycle']),
                'assetType': 'forex',
                'buyFrom': op['buyFrom'],
                'sellTo': op['sellTo'],
                'profitMargin': op['profitMargin'],
                'country': 'Global',
            })
    return opportunities

# Example usage for BTC/USD
if __name__ == "__main__":
    prices = get_prices()
    opps = find_arbitrage(prices)
    print(opps)