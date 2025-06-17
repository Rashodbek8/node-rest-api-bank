const express = require("express");
const app = express();

const userRoutes = require('../routes/userRoutes');
const accountRoutes = require('../routes/accountRoutes');
const logger = require('../middlewares/logger');
const errorHandler = require('../middlewares/errorHandler');

app.use(express.json());
app.use(logger);

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

app.get('/', (req, res) => res.send("API is running"));

app.use(errorHandler);

module.exports = app;