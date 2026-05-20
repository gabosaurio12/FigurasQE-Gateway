const express = require('express');
const axios = require('axios');

const router = express.Router();

const AUTH_SERVICE = process.env.AUTH_SERVICE;
const DATA_SERVICE = process.env.DATA_SERVICE;
const LOGS_SERVICE = process.env.LOGS_SERVICE || 'http://localhost:5186';
const FRONTEND_SERVICE = process.env.FRONTEND_SERVICE || 'http://localhost:5028';

const serviceHealthChecks = {
    auth: { upstream: AUTH_SERVICE, path: '/health' },
    data: { upstream: DATA_SERVICE, path: '/health' },
    frontend: { upstream: FRONTEND_SERVICE, path: '/health' },
    postgres: { upstream: DATA_SERVICE, path: '/health' },
    logs: { upstream: LOGS_SERVICE, path: '/health' },
    mongo: { upstream: LOGS_SERVICE, path: '/health' }
};

router.get('/', async (_req, res) => {
    return res.status(200).json({ service: 'gateway', status: 'ok' });
});

router.get('/:serviceName', async (req, res) => {
    const serviceName = req.params.serviceName.toLowerCase();

    if (serviceName === 'gateway') {
        return res.status(200).json({ service: 'gateway', status: 'ok' });
    }

    const healthCheck = serviceHealthChecks[serviceName];
    if (!healthCheck) {
        return res.status(404).json({ message: 'Unknown service.' });
    }

    const { upstream, path } = healthCheck;
    if (!upstream) {
        return res.status(503).json({
            service: serviceName,
            message: 'Upstream service is not configured.'
        });
    }

    try {
        const response = await axios.get(`${upstream}${path}`);
        return res.status(response.status).json({
            service: serviceName,
            ...response.data
        });
    } catch (error) {
        const status = error.response?.status || 503;
        const data = error.response?.data;
        return res.status(status).json({
            service: serviceName,
            message: data?.message || data?.detail || 'Service unavailable.',
            details: data || null
        });
    }
});

module.exports = router;