const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/users', verifyToken, verifyAdmin, adminController.getAllUsers);
router.delete('/users/:id', verifyToken, verifyAdmin, adminController.deleteUser);

module.exports = router;
