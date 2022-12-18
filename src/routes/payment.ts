import express from 'express';
import { verifyUser } from '../middleware/auth-user.middleware';
import PaymentController from '../controllers/payment.controller';
const paymentRoutes = express.Router();
const controller = new PaymentController();

paymentRoutes.post('/payment/:reservation_uuid', verifyUser, controller.payReservation);
// paymentRoutes.delete('/reservation/:reservation_uuid', verifyUser, controller.cancelReservation);

// paymentRoutes.get('/reservation-test', controller.testFee);

export default paymentRoutes;