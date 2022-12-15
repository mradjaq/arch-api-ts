import express from 'express';
import ParkingSpotModel from "../models/ParkingSpotModel";
import argon2 from "argon2";

class ParkingSpotController {
  constructor() {
    ParkingSpotModel.sync();
  }

  getAllParkingSpot = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const parking_spots = await ParkingSpotModel.findAll();

      response.status(200).json(parking_spots)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  getSpotByUUID = async (request: express.Request, response: express.Response) => {
    try {
      const res = await ParkingSpotModel.findOne({
        where: {
          uuid: request.params.uuid
        }
      });
      response.status(200).json(res)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  createNewParkingSpot = async (request: express.Request, response: express.Response) => {
    const { floor, spot_no } = request.body;
    try {
      await ParkingSpotModel.create({
        floor,
        spot_no,
        status: 'available'
      });
      response.status(201).json({msg: "Berhasil membuat tempat parkir baru"})
    } catch (error: any) {
      response.status(400).json({msg: error.message})
    }
  }

  updateParkingSpot = async (request: express.Request, response: express.Response) => {
    try {
      const parking_spot = await ParkingSpotModel.findOne({
        where: {
          uuid: request.params.uuid
        }
      });

      if(!parking_spot) return response.status(404).json({msg: "Tempat parkir tidak dapat ditemukan"})
      const { floor, spot_no, status, reservation_id } = request.body;

      await ParkingSpotModel.update({
        floor,
        spot_no,
        status,
      }, {
        where: {
          uuid: parking_spot.uuid
        }
      });

      response.status(201).json({msg: "Data tempat parkir berhasil diupdate"});
    } catch (error: any) {
      response.status(500).json({msg: error.message});
    }
  }
  
  deleteParkingSpot = async (request: express.Request, response: express.Response) => {
    try {
      const parking_spot = await ParkingSpotModel.findOne({
        where: {
          uuid: request.params.uuid
        }
      });

      if(!parking_spot) return response.status(404).json({msg: "Tempat parkir tidak dapat ditemukan"})
      

      await ParkingSpotModel.destroy({
        
        where: {
          uuid: parking_spot.uuid
        }
      });

      response.status(201).json({msg: "Tempat parkir berhasil dihapus"})
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }
}

export default ParkingSpotController