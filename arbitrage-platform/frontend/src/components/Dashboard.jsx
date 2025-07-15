import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Filters from './Filters';
import Alerts from './Alerts';

const Dashboard = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        assetType: 'crypto',
        region: '',
        riskLevel: '',
        profitMargin: ''
    });
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/opportunities');
                setOpportunities(response.data);
            } catch (error) {
                console.error('Error fetching opportunities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOpportunities();
        const interval = setInterval(fetchOpportunities, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Only reset selectedAsset if assetType changes
        if (newFilters.assetType !== filters.assetType) {
            setSelectedAsset(null);
        }
    };

    // Define asset type categories
    const assetCategories = [
        { label: 'Crypto', value: 'crypto' },
        { label: 'Stocks', value: 'stocks' },
        { label: 'Commodities', value: 'commodities' },
        { label: 'Forex', value: 'forex' },
    ];
    const activeCategory = filters.assetType || assetCategories[0].value;

    // Filter by selected asset type/category and other filters
    const filteredOpportunities = opportunities.filter(opportunity => {
        return (
            (!filters.assetType || opportunity.assetType === filters.assetType) &&
            // Only filter by region/riskLevel if those fields exist on the opportunity
            (!filters.region || (opportunity.region ? opportunity.region === filters.region : true)) &&
            (!filters.riskLevel || (opportunity.riskLevel ? opportunity.riskLevel === filters.riskLevel : true)) &&
            (!filters.profitMargin || opportunity.profitMargin >= filters.profitMargin)
        );
    });

    return (
        <div className="min-h-screen bg-white text-white flex flex-col items-center py-10 dashboard relative">
            <button
                className="absolute top-6 right-8 z-20 p-2 bg-white rounded shadow hover:bg-gray-100"
                onClick={() => setShowFilterModal(true)}
                aria-label="Open filters"
            >
                <span className="block w-6 h-1 bg-gray-800 mb-1 rounded"></span>
                <span className="block w-6 h-1 bg-gray-800 mb-1 rounded"></span>
                <span className="block w-6 h-1 bg-gray-800 rounded"></span>
            </button>
            {showFilterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-30">
                    <div className="bg-white text-black rounded-lg p-6 w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800"
                            onClick={() => setShowFilterModal(false)}
                            aria-label="Close filters"
                        >
                            &times;
                        </button>
                        <Filters onFilterChange={handleFilterChange} filters={filters} hideAssetType={false} />
                    </div>
                </div>
            )}
            <h1 className="text-4xl font-bold mb-2">
                <span className="text-black">Tracker for </span>
                <span className="text-blue-400 line-through">
                    Arbitrage Opportunities
                </span>
            </h1>
            <div className="bg-[#232b3e] rounded-xl shadow-lg p-8 w-full max-w-4xl">
                <div className="flex gap-4 mb-4">
                    {assetCategories.map(cat => (
                        <button
                            key={cat.value}
                            className={`px-4 py-2 rounded font-bold ${cat.value === activeCategory ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => handleFilterChange({ ...filters, assetType: cat.value })}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <p className="text-[#a0aec0]">Loading opportunities...</p>
                ) : (
                    <Table
                        opportunities={filteredOpportunities}
                    />
                )}
                <Alerts opportunities={filteredOpportunities} />
            </div>
        </div>
    );
};

export default Dashboard;