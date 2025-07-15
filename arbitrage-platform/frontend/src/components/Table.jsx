import React from 'react';

// Placeholder data for demonstration
const placeholderOpportunities = [
    {
        asset: 'BTC/USD',
        buyFrom: 'Binance',
        sellTo: 'Kraken',
        profitMargin: 1.2,
        country: 'USA',
    },
    {
        asset: 'ETH/USD',
        buyFrom: 'Coinbase',
        sellTo: 'Binance',
        profitMargin: 0.8,
        country: 'USA',
    },
    {
        asset: 'LTC/USD',
        buyFrom: 'Kraken',
        sellTo: 'Coinbase',
        profitMargin: 2.1,
        country: 'UK',
    },
];

const Table = ({ opportunities }) => {
    // Use placeholder data if no opportunities are provided
    const data = (opportunities && opportunities.length > 0) ? opportunities : placeholderOpportunities;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[#232b3e] rounded-xl text-black">
                <thead>
                    <tr className="border-b border-[#2d3748]">
                        <th className="py-3 px-4 font-semibold text-lg text-left">Asset</th>
                        <th className="py-3 px-4 font-semibold text-lg text-left">Buy From</th>
                        <th className="py-3 px-4 font-semibold text-lg text-left">Sell To</th>
                        <th className="py-3 px-4 font-semibold text-lg text-left">Profit %</th>
                        <th className="py-3 px-4 font-semibold text-lg text-left">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((opportunity, index) => (
                        <tr key={index} className="border-b border-[#2d3748] hover:bg-[#1a2233] transition-colors">
                            <td className="py-2 px-4 flex items-center gap-2 text-black">{opportunity.asset}</td>
                            <td className="py-2 px-4 text-black">{opportunity.buyFrom}</td>
                            <td className="py-2 px-4 text-black">{opportunity.sellTo}</td>
                            <td className="py-2 px-4 text-green-400 font-semibold">{opportunity.profitMargin}%</td>
                            <td className="py-2 px-4 text-black">{opportunity.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;