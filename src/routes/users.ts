import express from 'express';
import UserController from '../controllers/users.controller';
import { verifyUser } from "../middleware/auth-user.middleware";
const userRoutes = express.Router();
const controller = new UserController();

userRoutes.get('/users', verifyUser, controller.getAllUser);
userRoutes.get('/users/:uuid', verifyUser, controller.getUserByUUID);
userRoutes.post('/users', verifyUser, controller.createUser);
userRoutes.patch('/users/:uuid', verifyUser, controller.updateUser);
userRoutes.delete('/users/:uuid', verifyUser, controller.deleteUser);

export default userRoutes;