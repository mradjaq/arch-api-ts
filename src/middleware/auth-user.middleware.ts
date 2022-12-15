import UserModel from "../models/UserModel";
import express from "express";

export const verifyUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    if(!request.session.user_id) {
      return response.status(401).json({msg: "Mohon login kembali ke akun anda : "})
    }
    const user = await UserModel.findOne({
      attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
      where: {
        uuid: request.session.user_id
      }
    });
  
    if (!user) return response.status(404).json({msg: "User tidak ditemukan"});
    request.session.user_id = user.uuid;
    // request.session.role = user.role
    next();
  } catch (error: any) {
    console.log('err auth-middleware', error)
    response.status(500).json({msg: error.message})
    next(error)
  }
}

export const isUserManagement = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const user = await UserModel.findOne({
      attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
      where: {
        uuid: request.session.user_id
      }
    });
  
    if (!user) return response.status(404).json({msg: "User tidak ditemukan"});
    /**
     * @todo harus join table biar dapet nama role
     */
    // if (user.role) return response.status(403).json({msg: "Access Denied"});
    
    // request.session.role = user.role
    next();
  } catch (error: any) {
    console.log('err auth-middleware', error)
    response.status(500).json({msg: error.message})
    next(error)
  }
}