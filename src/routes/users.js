const express = require('express');
const router = express.Router();

const users = require('../controllers/usersController');

router.get('/', users.getAll);
router.get('/:id', users.getById);

module.exports = router;
