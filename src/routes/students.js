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

module.exports = router;