const express = require('express');
const axios = require('axios');

const router = express.Router();

const DATA_SERVICE = process.env.DATA_SERVICE;

router.get('/students', async (req, res) => {
    try {
        const response = await axios.get(`${DATA_SERVICE}/students`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Data Service Error" });
    }
});

router.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(
            `${DATA_SERVICE}/students/${id}`,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Data Service Error" });
    }
});

router.put('/students/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await axios.put(
            `${DATA_SERVICE}/students/${id}`,
            req.body,
            {
                headers: {
                    Authorization: req.headers.authorization,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("=== REAL ERROR FROM DATA SERVICE ===");

        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
        console.error("MESSAGE:", error.message);

        res.status(500).json({
            message: "Data Service Error",
            details: error.response?.data || error.message
        });
    }
});

router.get('/tutors/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(
            `${DATA_SERVICE}/tutors/${id}`,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Data Service Error" });
    }
});

router.put('/tutors/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await axios.put(
            `${DATA_SERVICE}/tutors/${id}`,
            req.body,
            {
                headers: {
                    Authorization: req.headers.authorization,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("=== REAL ERROR FROM DATA SERVICE ===");

        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
        console.error("MESSAGE:", error.message);

        res.status(500).json({
            message: "Data Service Error",
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;