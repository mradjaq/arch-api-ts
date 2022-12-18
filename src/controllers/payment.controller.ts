import express from 'express';
import UserModel from "../models/UserModel";
import WalletModel from "../models/WalletModel";
import ReservationModel, { IReservation } from "../models/ReservationModel";
import PaymentModel from "../models/PaymentModel";
import ParkingSpotModel from "../models/ParkingSpotModel";
import argon2 from "argon2";
import { mySqlConnection, mysql_connection } from "../server";
import { Error } from 'sequelize';
// import UserModel from '../models/user';

class PaymentController {
  constructor() {
    PaymentModel.sync()
  }
  
  async getUser(user_uuid: string) {
    try {
      const user = await UserModel.findOne({
        where: {
          uuid: user_uuid
        }
      });
      return user
    } catch (error) {
      throw error
    }
  }

  async getWallet(wallet_uuid: string) {
    try {
      const wallet = await WalletModel.findOne({
        where: {
          uuid: wallet_uuid
        }
      });
      return wallet
    } catch (error) {
      throw error
    }
  }

  async updateParkingSpotStatus(parking_spot_id: string) {
    try {
      await ParkingSpotModel.update({
        status: 'available',
        reservationUuid: ''
      }, {
        where: {
          uuid: parking_spot_id
        }
      })
    } catch (error) {
      throw error
    }
  }

  payReservation = async (request: express.Request, response: express.Response) => {
    const reservation_uuid = request.params.reservation_uuid;
    
    try {
      const reservation = await ReservationModel.findOne({
        where: {
          uuid: reservation_uuid
        }
      });
      if(!reservation) return response.status(404).json({msg: "Reservasi tidak dapat ditemukan"});

      // this.getUser(request?.session?.user_id);
      const user = await UserModel.findOne({
        where: {
          uuid: request?.session?.user_id
        }
      });
      
      // const wallet = this.getWallet(user?.walletUuid);
      const wallet = await WalletModel.findOne({
        where: {
          uuid: user?.walletUuid
        }
      });
      if(!wallet) return response.status(404).json({msg: "Wallet undefined"}); 
      if(wallet.balance < reservation.fee) return response.status(400).json({msg: "Saldo Anda tidak mencukupi untuk melakukan pembayaran"});
      let currene_balance = wallet.balance - reservation.fee;
      
      await ParkingSpotModel.update({
        status: 'available',
        reservationUuid: null
      }, {
        where: {
          uuid: reservation.parking_spot_id
        }
      });

      await WalletModel.update({
        balance: currene_balance
      }, {
        where: {
          uuid: user?.walletUuid
        }
      });

      await PaymentModel.create({
        amount_due: reservation.fee,
        paid: true,
        reservationUuid: reservation_uuid
      });

      await UserModel.update({
        reservationUuid: null
      }, {
        where: {
          uuid: request.session.user_id
        }
      })

      return response.status(200).json({msg: "Pembayaran berhasil"});
    } catch (error: any) {
      throw response.status(500).json({msg: error.message});
    }
  }
}
 
export default PaymentController;