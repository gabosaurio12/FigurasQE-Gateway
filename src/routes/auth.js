const express = require('express');
const axios = require('axios');

const router = express.Router();

const AUTH_SERVICE = process.env.AUTH_SERVICE;

router.post('/login', async (req, res) => {
    try {
        const response = await axios.post(
            `${AUTH_SERVICE}/auth/login`,
            req.body
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Authentication Service Error"
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const response = await axios.post(
            `${AUTH_SERVICE}/auth/register`,
            req.body
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Authentication Service Error"
        });
    }
});

module.exports = router;