import express from 'express'
import { login, register } from '../controllers/authController.js';

const router = express.Router()

// REGISTER 
router.post('/register',register)
// LOGIN
router.post('/login',login)


export default router;