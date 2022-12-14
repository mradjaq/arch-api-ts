import express from 'express';
import authController from '../controllers/auth';
const authRoutes = express.Router();
const controller = new authController();

authRoutes.get('/me', controller.Me);
authRoutes.post('/login', controller.login);
authRoutes.delete('/logout', controller.logout);

export default authRoutes;