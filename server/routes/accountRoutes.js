const express = require("express");
const router = express.Router();
const accountController = require('../controllers/accountController');
const verifyToken = require("../middlewares/verifyToken");
const checkRole = require("../middlewares/checkRole");

router.get('/', verifyToken, checkRole("admin"), accountController.getAccounts);
router.get('/:id', verifyToken, checkRole("admin"), accountController.getAccountById);
router.post('/', verifyToken, checkRole("admin"), accountController.createAccount);
router.put('/:id', verifyToken, checkRole("admin"), accountController.updateAccount);
router.delete('/:id', verifyToken, checkRole("admin"), accountController.deleteAccount);

module.exports = router;