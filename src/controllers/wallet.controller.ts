import express from 'express';
import UserModel from "../models/UserModel";
import WalletModel from "../models/WalletModel";
import argon2 from "argon2";
import { mySqlConnection, mysql_connection } from "../server";
import { Error } from 'sequelize';
// import UserModel from '../models/user';

class WalletController {
  constructor() {
    WalletModel.sync()
  }
  
  topupWalletBalance = async (request: express.Request, response: express.Response) => {
    try {
      let topup_balance = request.body.balance;
      if(topup_balance < 10000) response.status(400).json({msg: "Saldo topup kurang dari minimal yang ditentukan"});

      const user = await UserModel.findOne({
        where: {
          uuid: request.session.user_id
        }
      })

      const wallet = await WalletModel.findOne({
        where: {
          uuid: user?.walletUuid
        }
      })

      topup_balance += wallet?.balance;

      await WalletModel.update({
        balance: topup_balance
      }, {
        where: {
          uuid: wallet?.uuid
        }
      })
      response.status(201).json({msg: "Berhasil menambah saldo dompet"});
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }
}
 
export default WalletController;