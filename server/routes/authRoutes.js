const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController');
const dotenv = require('dotenv').config();

// middleware
router.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN
  })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile)

module.exports = router;