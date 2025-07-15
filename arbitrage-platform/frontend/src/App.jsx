import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Filters from './components/Filters';
import Alerts from './components/Alerts';
import Table from './components/Table';

const App = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [filters, setFilters] = useState({
        assetType: '',
        region: '',
        riskLevel: '',
        profitMargin: ''
    });

    useEffect(() => {
        const fetchOpportunities = async () => {
            const response = await fetch('/api/opportunities');
            const data = await response.json();
            setOpportunities(data);
        };

        fetchOpportunities();
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="app">
            <Dashboard/>
        </div>
    );
};

export default App;