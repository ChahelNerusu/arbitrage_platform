import express from 'express';
import { getOpportunities } from '../data/fetchExchanges';

const router = express.Router();

// Endpoint to fetch arbitrage opportunities
router.get('/opportunities', async (req, res) => {
    try {
        const opportunities = await getOpportunities();
        res.status(200).json(opportunities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching opportunities', error: error.message });
    }
});

export default router;