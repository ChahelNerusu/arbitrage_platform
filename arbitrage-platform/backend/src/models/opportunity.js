const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    asset: {
        type: String,
        required: true
    },
    exchangeA: {
        type: String,
        required: true
    },
    exchangeB: {
        type: String,
        required: true
    },
    spread: {
        type: Number,
        required: true
    },
    estimatedProfit: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;