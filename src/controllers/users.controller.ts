import express, { response } from 'express';
import UserModel from "../models/UserModel";
import argon2 from "argon2";
import WalletModel from "../models/WalletModel";
import { mySqlConnection, mysql_connection } from "../server";
import { Error } from 'sequelize';
// import UserModel from '../models/user';

class UserController {
	// Object of User model
  role = {
    user: '7bb3d328-ed9c-4d61-8a15-da2fe0427e52',
    user_management: 'a2fc93d9-93c1-4fac-ba1c-780d29d22520',
    parking_management: '35f88308-b04d-4b95-bdf4-815f23992a64'
  }
  constructor() {
    UserModel.sync();
  }

  testHalo= (request: express.Request, response: express.Response) => {
    response.send('GALLOOO')
  }
  
  getAllUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const res = await UserModel.findAll({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'token', 'createdAt', 'updatedAt']
      });

      response.status(200).json(res)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  getUserByUUID = async (request: express.Request, response: express.Response) => {
    try {
      const res = await UserModel.findOne({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservationUuid', 'token', 'createdAt', 'updatedAt'],
        where: {
          uuid: request.params.uuid
        }
      });
      response.status(200).json(res)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  createUser = async (request: express.Request, response: express.Response) => {
    const { name, email, password, confPassword, vehicle_no, roleUuid } = request.body;
    if (password !== confPassword) return response.status(400).json({
      msg: 'Password dan Password konfirmasi tidak sama'
    })
    
    const hashPassword = await argon2.hash(password);
    try {
      const wallet_uuid = await this.createUserWallet();
      await UserModel.create({
        username: name,
        email,
        password: hashPassword,
        vehicle_no,
        roleUuid: roleUuid,
        walletUuid: wallet_uuid
      });
      response.status(201).json({msg: "Berhasil membuat user"});
    } catch (error: any) {
      response.status(400).json({msg: error.message})
    }
  }

  registerUser = async (request: express.Request, response: express.Response) => {
    const { name, email, password, confPassword, vehicle_no, roleUuid } = request.body;
    if (password !== confPassword) return response.status(400).json({
      msg: 'Password dan Password konfirmasi tidak sama'
    })
    
    const hashPassword = await argon2.hash(password)
    try {
      const wallet_uuid = await this.createUserWallet();
      console.log('wallet_uuid', wallet_uuid)
      await UserModel.create({
        username: name,
        email,
        password: hashPassword,
        vehicle_no,
        roleUuid: this.role.user, // MRQ: USER ROLEUIUID
        walletUuid: wallet_uuid
      });
      response.status(201).json({msg: "Berhasil Melakukan pendaftaran"})
    } catch (error: any) {
      response.status(400).json({msg: error.message})
    }
  }

  updateUser = async (request: express.Request, response: express.Response) => {
    try {
      const user = await UserModel.findOne({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'token', 'createdAt', 'updatedAt'],
        where: {
          uuid: request.params.uuid
        }
      });

      if(!user) return response.status(404).json({msg: "User tidak dapat ditemukan"})
      const { name, email, password, confPassword, vehicle_no } = request.body;

      let hashPassword = '';
      if(password == '' || password === null) {
        hashPassword = user.password as string;
      } else {
        hashPassword = await argon2.hash(password)
      }

      if (password !== confPassword) return response.status(400).json({
        msg: 'Password dan Password konfirmasi tidak sama'
      })

      await UserModel.update({
        username: name,
        email,
        password: hashPassword,
        vehicle_no
      }, {
        where: {
          uuid: user.uuid
        }
      });

      response.status(201).json({msg: "Data User berhasil diupdate"})
    } catch (error: any) {
      response.status(500).json({msg: error.message});
    }
  }

  deleteUser = async (request: express.Request, response: express.Response) => {
    try {
      const user = await UserModel.findOne({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'token', 'createdAt', 'updatedAt'],
        where: {
          uuid: request.params.uuid
        }
      });

      if(!user) return response.status(404).json({msg: "User tidak dapat ditemukan"})
      

      await UserModel.destroy({
        
        where: {
          uuid: user.uuid
        }
      });

      response.status(201).json({msg: "Data User berhasil dihapus"})
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  async createUserWallet() {
    try {
      const wallet = await WalletModel.create({
        balance: 0
      });
      
      return wallet.uuid
    } catch (error: any) {
      throw error;
      // response.status(500).json({ msg: error.message });
    }
  }
}
 
export default UserController;