import express from 'express';
import ParkingSpotController from '../controllers/parking-spot.controller';
const parkingSpotRoutes = express.Router();
const controller = new ParkingSpotController();

// userRoutes.get('/fetch', controller.getAllPosts);
// userRoutes.post('/create', controller.createAPost);
// userRoutes.post('/test-get', controller.getTest);
// userRoutes.get('/test-halo', controller.testHalo);
// userRoutes.get('/users', controller.getAllUser);
// userRoutes.get('/users/:uuid', controller.getUserByUUID);
// userRoutes.post('/users', controller.createUser);
// userRoutes.patch('/users/:uuid', controller.updateUser);
// userRoutes.delete('/users/:uuid', controller.deleteUser);

export default parkingSpotRoutes;