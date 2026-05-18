const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const handsRoutes = require('./routes/hands');

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/hands', handsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});