// module imports
const express = require('express');

// file imports
const { addUser, updateUser } = require('../controllers/user');

// variable initializations
const router = express.Router();

router.post('/', addUser);
router.patch('/:id', updateUser);

module.exports = router;
