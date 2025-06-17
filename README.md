# Node REST API Bank

This is a simple RESTful API for managing users and their bank accounts, built with Node.js and Express. The application uses in-memory storage (arrays), making it suitable for learning and prototyping purposes.

## 📁 Project Structure

server/

├── app/

│ ├── app.js # Express app setup
│

├── controllers/

│ ├── userController.js # Handles user-related requests

│ └── accountController.js # Handles account-related requests
│

├── middlewares/

│ ├── logger.js # Logs each incoming request

│ └── errorHandler.js # Catches and handles errors
│

├── routes/

│ ├── userRoutes.js # Defines user endpoints

│ └── accountRoutes.js # Defines account endpoints
│

├── services/

│ ├── userService.js # Logic for managing users

│ └── accountService.js # Logic for managing accounts
│

└── index.js # Starts the server

## 🚀 Features

- Create, read, update, delete (CRUD) users
- Create, read, update, delete (CRUD) accounts
- Automatically creates an account when a new user is registered
- Logs all HTTP requests
- Centralized error handling

## 📦 Installation

git clone https://github.com/Rashodbek8/node-rest-api-bank.git
cd node-rest-api-bank
npm install

🏁 Running the Server

node index.js

The server will run on:

http://localhost:3000

🔁 API Endpoints

Users:

GET /users

GET /users/:id

POST /users

PUT /users/:id

DELETE /users/:id

Accounts:

GET /accounts

GET /accounts/:id

POST /accounts

PUT /accounts/:id

DELETE /accounts/:id

🧪 Testing

Use tools like Postman, Insomnia, or curl to test API endpoints.

⚠️ Notes

All data is stored in memory (not persisted between server restarts).

No authentication or authorization is implemented (yet).

Feel free to fork or contribute to the project!

© 2025 Rashodbek Qudratullayev
