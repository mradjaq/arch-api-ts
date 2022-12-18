"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import UserModel from '../models/user';
class UserController {
    constructor() {
        this.topupWalletBalance = (request, response) => {
            try {
                const topup_balance = request.body.balance;
                if (topup_balance < 10000)
                    response.status(400).json({ msg: "Saldo topup kurang dari minimal yang ditentukan" });
            }
            catch (error) {
            }
        };
    }
}
exports.default = UserController;
