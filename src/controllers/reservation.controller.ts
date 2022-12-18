import express from 'express';
import ReservationModel, { IReservation } from "../models/ReservationModel";
import ParkingSpotModel from "../models/ParkingSpotModel";
import UserModel from "../models/UserModel";
import cron from "node-cron";

class ReservationController {
  constructor() {
    ReservationModel.sync();
  }

  createReservation = async (request: express.Request, response: express.Response) => {
    const parking_spot_id = request.params.parking_spot_id;

    try {
      const parking_spot = await ParkingSpotModel.findOne({
        where: {
          uuid: parking_spot_id
        }
      });
      if(!parking_spot) return response.status(404).json({msg: "Tempat parkir tidak dapat ditemukan"});
      if(parking_spot.reservationUuid) return response.status(404).json({msg: "Tempat parkir berada dalam pemesanan orang lain"});

      const reservation = await ReservationModel.create({
        parking_spot_id,
        fee: 2000
      })
      
      if(!reservation) return response.status(404).json({msg: "Gagal melakukan pemesanan tempat parkir"});
      
      await ParkingSpotModel.update({
        floor: parking_spot.floor,
        spot_no: parking_spot.spot_no,
        status: 'booked',
        reservationUuid: reservation.uuid
      }, {
        where: {
          uuid: parking_spot.uuid
        }
      });

      /** Radja: Update col reservationUuid on user table */
      await UserModel.update({
        reservationUuid: reservation.uuid
      }, {
        where: {
          uuid: request.session.user_id
        }
      })

      const reservation_response = {
        reservation,
        parking_spot
      }
      this.countTotalFee(reservation, parking_spot_id);

      response.status(200).json(reservation_response)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  cancelReservation = async (request: express.Request, response: express.Response) => {
    const reservation_uuid = request.params.reservation_uuid;
    
    try {
      const reservation = await ReservationModel.findOne({
        where: {
          uuid: reservation_uuid
        }
      });

      if(!reservation) return response.status(404).json({msg: "Pemesanan tidak dapat ditemukan"})
      

      await ReservationModel.destroy({
        where: {
          uuid: reservation.uuid
        }
      });

      response.status(201).json({msg: "Berhasil membatalkan pemesanan"})
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  countTotalFee = (reservation: IReservation, parking_spot_id: string) => {
    cron.schedule('* * * * * *', async () => {
      const created_date = reservation?.createdAt?.getTime() ||  Date.now();
      
      const now = Date.now();
      var diff = now - created_date;
      var diffInHours = diff/1000/60/60; // Convert milliseconds to hours
      
      let updated_fee = diffInHours >= 1 ? reservation.fee * (diffInHours + 1) : reservation.fee;

      try {
        await ReservationModel.update({
          fee: updated_fee,
          parking_spot_id
        }, {
          where: {
            uuid: reservation.uuid
          }
        })
        return { msg: "Berhasil melakukan update biaya"};
      } catch (error: any) {
        throw error
      }
    })
  }
}

export default ReservationController