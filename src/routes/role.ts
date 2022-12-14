import express from 'express';
import RoleController from '../controllers/role.controller';
const roleRoutes = express.Router();
const controller = new RoleController();

// userRoutes.get('/fetch', controller.getAllPosts);
// userRoutes.post('/create', controller.createAPost);
// userRoutes.post('/test-get', controller.getTest);
// userRoutes.get('/test-halo', controller.testHalo);
// userRoutes.get('/users', controller.getAllUser);
// userRoutes.get('/users/:uuid', controller.getUserByUUID);
// userRoutes.post('/users', controller.createUser);
// userRoutes.patch('/users/:uuid', controller.updateUser);
// userRoutes.delete('/users/:uuid', controller.deleteUser);

export default roleRoutes;