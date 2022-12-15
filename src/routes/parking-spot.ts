import express from 'express';
import { isParkingManagement, verifyUser } from '../middleware/auth-user.middleware';
import ParkingSpotController from '../controllers/parking-spot.controller';
const parkingSpotRoutes = express.Router();
const controller = new ParkingSpotController();


parkingSpotRoutes.get('/parking-spot', verifyUser, controller.getAllParkingSpot);
parkingSpotRoutes.get('/parking-spot/:uuid', verifyUser, controller.getSpotByUUID);
parkingSpotRoutes.post('/parking-spot', verifyUser, isParkingManagement, controller.createNewParkingSpot);
parkingSpotRoutes.patch('/parking-spot/:uuid', verifyUser, isParkingManagement, controller.updateParkingSpot);
parkingSpotRoutes.delete('/parking-spot/:uuid', verifyUser, isParkingManagement, controller.deleteParkingSpot);

export default parkingSpotRoutes;