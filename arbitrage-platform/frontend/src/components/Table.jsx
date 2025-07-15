import React from 'react';

const Table = ({ opportunities }) => {
    if (!opportunities || opportunities.length === 0) {
        return <div className="text-black p-4">No arbitrage opportunities found.</div>;
    }
    // Color logic for profit percentage
    const getProfitColor = (profit) => {
        if (profit >= 2) return 'text-red-500'; // very high
        if (profit >= 1) return 'text-orange-400'; // high
        if (profit >= 0.5) return 'text-yellow-400'; // moderate
        return 'text-green-400'; // low
    };
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
                    {opportunities.map((opportunity, index) => (
                        <tr key={index} className="border-b border-[#2d3748] hover:bg-[#1a2233] transition-colors">
                            <td className="py-2 px-4 flex items-center gap-2 text-black">{opportunity.asset}</td>
                            <td className="py-2 px-4 text-black">{opportunity.buyFrom}</td>
                            <td className="py-2 px-4 text-black">{opportunity.sellTo}</td>
                            <td className={`py-2 px-4 font-semibold ${getProfitColor(opportunity.profitMargin)}`}>{opportunity.profitMargin}%</td>
                            <td className="py-2 px-4 text-black">{opportunity.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;