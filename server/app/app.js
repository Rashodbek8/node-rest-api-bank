require('dotenv').config();
const express = require("express");
const app = express();

const userRoutes = require('../routes/userRoutes');
const accountRoutes = require('../routes/accountRoutes');
const authRoutes = require("../routes/authRoutes");
const transactionRoutes = require("../routes/transactionRoutes");
const webhookRoute = require("../routes/webhookRoute");

const logger = require('../middlewares/logger');
const errorHandler = require('../middlewares/errorHandler');
const verifyToken = require("../middlewares/verifyToken");

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

app.use('/transactions', transactionRoutes);

app.use('/webhook', webhookRoute);

app.get('/', (req, res) => res.send("API is running"));

app.use(errorHandler);

module.exports = app;