const express = require('express');
const { register, login, getUsers, updateUser, deleteUser } = require('../controllers/authController');
const router = express.Router();

const { isAdmin } = require('../middlewares/roleMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/users', isAdmin, getUsers); 
router.put('/users/:id', isAdmin, updateUser); 
router.delete('/users/:id', isAdmin, deleteUser); 

module.exports = router;
