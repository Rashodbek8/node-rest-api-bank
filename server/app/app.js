require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require('../routes/userRoutes');
const accountRoutes = require('../routes/accountRoutes');
const authRoutes = require("../routes/authRoutes");
const transactionRoutes = require("../routes/transactionRoutes");
const webhookRoute = require("../routes/webhookRoute");

const logger = require('../middlewares/logger');
const errorHandler = require('../middlewares/errorHandler');
const applySecurity = require("../middlewares/security");

app.set("trust proxy", 1); // нужно до rate-limit, особенно если за proxy (например, Heroku или Nginx)

// ✅ CORS — обязательно ДО JSON и роутов
app.use(cors({ origin: "http://127.0.0.1:5500" })); // 👈 это важно

// ✅ сначала применяем безопасность
applySecurity(app);

// ✅ затем парсим JSON
app.use(express.json());

// ✅ затем логгер
app.use(logger);

// ✅ затем роуты
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/webhook', webhookRoute);

// Health check
app.get('/', (req, res) => res.send("API is running"));

// ✅ в конце — обработчик ошибок
app.use(errorHandler);

module.exports = app;
