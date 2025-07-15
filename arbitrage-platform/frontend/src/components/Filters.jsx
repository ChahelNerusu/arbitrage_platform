import React from 'react';

const Filters = ({ onFilterChange }) => {
    const [assetType, setAssetType] = React.useState('');
    const [region, setRegion] = React.useState('');
    const [riskLevel, setRiskLevel] = React.useState('');
    const [profitMargin, setProfitMargin] = React.useState('');

    const handleFilterChange = () => {
        onFilterChange({
            assetType,
            region,
            riskLevel,
            profitMargin,
        });
    };

    return (
        <div className="filters text-black">
            <h2 className="mb-4">Filter Opportunities</h2>
            <div className="filter-group flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <label className="mr-2">Asset Type:</label>
                <select className="border rounded px-2 py-1 w-full md:w-auto" value={assetType} onChange={(e) => setAssetType(e.target.value)} onBlur={handleFilterChange}>
                    <option value="">All</option>
                    <option value="crypto">Crypto</option>
                    <option value="stocks">Stocks</option>
                    <option value="commodities">Commodities</option>
                    <option value="forex">Forex</option>
                </select>
            </div>
            <div className="filter-group flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <label className="mr-2">Region:</label>
                <input className="border rounded px-2 py-1 w-full md:w-auto" type="text" value={region} onChange={(e) => setRegion(e.target.value)} onBlur={handleFilterChange} />
            </div>
            <div className="filter-group flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <label className="mr-2">Risk Level:</label>
                <select className="border rounded px-2 py-1 w-full md:w-auto" value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} onBlur={handleFilterChange}>
                    <option value="">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className="filter-group flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <label className="mr-2">Profit Margin (%):</label>
                <input className="border rounded px-2 py-1 w-full md:w-auto" type="number" value={profitMargin} onChange={(e) => setProfitMargin(e.target.value)} onBlur={handleFilterChange} />
            </div>
        </div>
    );
};

export default Filters;