const express = require('express');
const axios = require('axios');

const router = express.Router();

const DATA_SERVICE = process.env.DATA_SERVICE;

router.get('/students', async (req, res) => {
    try {
        const response = await axios.get(`${DATA_SERVICE}/students`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
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
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
    }
});

router.get('/students/:id/sessions', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(
            `${DATA_SERVICE}/students/${id}/sessions`,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const response = await axios.post(
            `${DATA_SERVICE}/sessions`,
            req.body,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
    }
});

router.post('/level-results', async (req, res) => {
    try {
        const response = await axios.post(
            `${DATA_SERVICE}/level-results`,
            req.body,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
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
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
    }
});

router.get('/tutors/:id/students', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(
            `${DATA_SERVICE}/tutors/${id}/students`,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
    }
});

router.post('/tutors/assign-student', async (req, res) => {
    try {
        const response = await axios.post(
            `${DATA_SERVICE}/tutors/assign-student`,
            req.body,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
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
                    Authorization: req.headers.authorization
                }
            }
        );
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data;
        res.status(status).json({ message: data?.message || "Data Service Error" });
    }
});

module.exports = router;