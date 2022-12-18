import express from 'express';
import { verifyUser } from '../middleware/auth-user.middleware';
import ReservationController from '../controllers/reservation.controller';
const reservationRoutes = express.Router();
const controller = new ReservationController();

reservationRoutes.post('/reservation/:parking_spot_id', verifyUser, controller.createReservation);
reservationRoutes.delete('/reservation/:reservation_uuid', verifyUser, controller.cancelReservation);

// reservationRoutes.get('/reservation-test', controller.testFee);

export default reservationRoutes;