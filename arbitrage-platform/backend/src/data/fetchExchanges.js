const axios = require('axios');

const exchanges = [
    {
        name: 'Binance',
        url: 'https://api.binance.com/api/v3/ticker/price'
    },
    {
        name: 'Coinbase',
        url: 'https://api.coinbase.com/v2/prices/spot?currency=USD'
    },
    {
        name: 'Kraken',
        url: 'https://api.kraken.com/0/public/Ticker?pair=XBTUSD'
    }
];

async function fetchPrices() {
    const pricePromises = exchanges.map(async (exchange) => {
        try {
            const response = await axios.get(exchange.url);
            return {
                exchange: exchange.name,
                price: exchange.name === 'Coinbase' ? response.data.data.amount : response.data.price
            };
        } catch (error) {
            console.error(`Error fetching data from ${exchange.name}:`, error);
            return null;
        }
    });

    const prices = await Promise.all(pricePromises);
    return prices.filter(price => price !== null);
}

module.exports = {
    fetchPrices
};