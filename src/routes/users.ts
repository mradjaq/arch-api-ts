import express from 'express';
import UserController from '../controllers/users.controller';
import { isUserManagement, verifyUser } from "../middleware/auth-user.middleware";
const userRoutes = express.Router();
const controller = new UserController();

userRoutes.get('/users', verifyUser, isUserManagement, controller.getAllUser);
userRoutes.get('/users/:uuid', verifyUser, controller.getUserByUUID);
userRoutes.post('/users', verifyUser, isUserManagement,controller.createUser);
userRoutes.post('/register', controller.registerUser);
userRoutes.patch('/users/:uuid', verifyUser, controller.updateUser);
userRoutes.delete('/users/:uuid', verifyUser, controller.deleteUser);

export default userRoutes;