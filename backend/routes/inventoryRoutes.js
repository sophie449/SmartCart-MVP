const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getInventory);
router.get('/:id', inventoryController.getInventory);
router.post('/', inventoryController.addItem);
router.delete('/:id', inventoryController.deleteItem);
router.put('/:id', inventoryController.updateItem);

module.exports = router;
