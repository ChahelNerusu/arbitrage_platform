import requests

def get_binance_price(symbol='BTCUSDT'):
    url = f'https://api.binance.com/api/v3/ticker/price?symbol={symbol}'
    return float(requests.get(url).json()['price'])

def get_kraken_price(pair='XBTUSD'):
    url = 'https://api.kraken.com/0/public/Ticker?pair=XBTUSD'
    result = requests.get(url).json()['result']
    return float(list(result.values())[0]['c'][0])

def find_arbitrage(prices):
    opportunities = []
    for asset, exchanges in prices.items():
        sorted_ex = sorted(exchanges.items(), key=lambda x: x[1])
        buy_exchange, buy_price = sorted_ex[0]
        sell_exchange, sell_price = sorted_ex[-1]
        profit_pct = ((sell_price - buy_price) / buy_price) * 100
        if profit_pct > 0:  # Filter noise
            opportunities.append({
                'asset': asset,
                'buyFrom': buy_exchange,  # changed to match frontend
                'sellTo': sell_exchange,  # changed to match frontend
                'profitMargin': round(profit_pct, 2),  # changed to match frontend
                'spread': round(sell_price - buy_price, 2),
                'country': ''  # placeholder, can be filled with logic if needed
            })
    return opportunities

# Example usage for BTC/USD
if __name__ == "__main__":
    prices = {
        'BTC/USD': {
            'binance': get_binance_price('BTCUSDT'),
            'kraken': get_kraken_price('XBTUSD')
        }
    }
    opps = find_arbitrage(prices)
    print(opps)
