import React, { useState, useEffect } from 'react';

const Alerts = ({ opportunities }) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const newAlerts = opportunities.filter(opportunity => opportunity.estimatedProfit > 0.05); // Example threshold
        setAlerts(newAlerts);
    }, [opportunities]);

    return (
        <div className="alerts">
            <h2 className="text-lg font-bold">Alerts</h2>
            {alerts.length > 0 ? (
                <ul className="list-disc pl-5">
                    {alerts.map((alert, index) => (
                        <li key={index} className="my-2">
                            <strong>{alert.asset}</strong>: Profit potential of {alert.estimatedProfit * 100}% between {alert.exchangeA} and {alert.exchangeB}.
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No alerts at this time.</p>
            )}
        </div>
    );
};

export default Alerts;