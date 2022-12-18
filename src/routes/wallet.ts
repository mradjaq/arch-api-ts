import express from 'express';
import { verifyUser } from '../middleware/auth-user.middleware';
import WalletController from '../controllers/wallet.controller';
const walletRoutes = express.Router();
const controller = new WalletController();

walletRoutes.post('/wallet-topup', verifyUser, controller.topupWalletBalance);

export default walletRoutes;