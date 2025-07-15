const calculateSpread = (priceA, priceB) => {
    if (priceA <= 0 || priceB <= 0) {
        throw new Error("Prices must be greater than zero.");
    }
    return ((priceB - priceA) / priceA) * 100; // Spread in percentage
};

const calculateNetProfit = (estimatedProfit, fees) => {
    if (estimatedProfit < 0 || fees < 0) {
        throw new Error("Estimated profit and fees must be non-negative.");
    }
    return estimatedProfit - fees; // Net profit after fees
};

module.exports = {
    calculateSpread,
    calculateNetProfit,
};