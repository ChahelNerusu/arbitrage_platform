import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Filters from './Filters';
import Alerts from './Alerts';

const Dashboard = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        assetType: '',
        region: '',
        riskLevel: '',
        profitMargin: ''
    });
    const [selectedAsset, setSelectedAsset] = useState(null);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await axios.get('/api/opportunities');
                setOpportunities(response.data);
            } catch (error) {
                console.error('Error fetching opportunities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOpportunities();
        const interval = setInterval(fetchOpportunities, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setSelectedAsset(null); // Reset asset selection on filter change
    };

    // Filter by assetType, region, profitMargin
    const filteredOpportunities = opportunities.filter(opportunity => {
        return (
            (!filters.assetType || opportunity.asset === filters.assetType) &&
            (!filters.region || opportunity.region === filters.region) &&
            (!filters.profitMargin || opportunity.profitMargin >= filters.profitMargin)
        );
    });

    return (
        <div className="min-h-screen bg-white text-white flex flex-col items-center py-10 dashboard">
            <h1 className="text-4xl font-bold mb-2">
                <span className="text-black">Tracker for </span>
                <span className="text-blue-400 line-through">
                    Arbitrage Opportunities
                </span>
            </h1>
            <div className="bg-[#232b3e] rounded-xl shadow-lg p-8 w-full max-w-4xl">
                <Filters onFilterChange={handleFilterChange} />
                {loading ? (
                    <p className="text-[#a0aec0]">Loading opportunities...</p>
                ) : (
                    <Table
                        opportunities={filteredOpportunities}
                        selectedAsset={selectedAsset}
                        onAssetSelect={setSelectedAsset}
                        riskLevel={filters.riskLevel}
                    />
                )}
                <Alerts opportunities={filteredOpportunities} />
            </div>
        </div>
    );
};

export default Dashboard;