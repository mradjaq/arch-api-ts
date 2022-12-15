import express from 'express';
import { isParkingManagement, isUserManagement, verifyUser } from '../middleware/auth-user.middleware';
import RoleController from '../controllers/role.controller';
const roleRoutes = express.Router();
const controller = new RoleController();

roleRoutes.get('/role', verifyUser, isUserManagement, controller.getAllRole);
roleRoutes.post('/role', verifyUser, isUserManagement, controller.createRole);
roleRoutes.patch('/role/:uuid', verifyUser, isUserManagement, controller.updateRole);

export default roleRoutes;