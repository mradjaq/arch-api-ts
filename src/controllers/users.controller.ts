import express from 'express';
import UserModel from "../models/UserModel";
import argon2 from "argon2";
import { mySqlConnection, mysql_connection } from "../server";
import { Error } from 'sequelize';
// import UserModel from '../models/user';

class UserController {
	// Object of User model
  constructor() {
    UserModel.sync();
  }
  // getTest = (request: express.Request, response: express.Response) => {
  //   console.log('Requset', request.body)
  //     let query = 'SELECT * FROM radjaparking.test WHERE name='${request.body.name}';`
  //     mysql_connection.query(query, (err: any, result: any) => {
  //       if (err) console.log("ERR", err);        
  //       else response.send({
  //         data: result
  //       })
        
  //     })
  // }

  testHalo= (request: express.Request, response: express.Response) => {
    response.send('GALLOOO')
  }
  
  getAllUser = async (request: express.Request, response: express.Response) => {
    try {
      const res = await UserModel.findAll({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt']
      }
      );
      response.status(200).json(res)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  getUserByUUID = async (request: express.Request, response: express.Response) => {
    try {
      const res = await UserModel.findOne({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
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
    const { name, email, password, confPassword, vehicle_no } = request.body;
    if (password !== confPassword) return response.status(400).json({
      msg: 'Password dan Password konfirmasi tidak sama'
    })
    
    const hashPassword = await argon2.hash(password)
    try {
      await UserModel.create({
        username: name,
        email,
        password: hashPassword,
        vehicle_no
      });
      response.status(201).json({msg: "Berhasil membuat user"})
    } catch (error: any) {
      response.status(400).json({msg: error.message})
    }
  }
  updateUser = async (request: express.Request, response: express.Response) => {
    try {
      const user = await UserModel.findOne({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
        where: {
          uuid: request.params.uuid
        }
      });

      if(!user) return response.status(404).json({msg: "User tidak dapat ditemukan"})
      const { name, email, password, confPassword, vehicle_no } = request.body;

      let hashPassword = '';
      if(password == '' || password === null) {
        hashPassword = user.password;
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
      response.status(500).json({msg: error.message})
    }
  }
  deleteUser = async (request: express.Request, response: express.Response) => {
    try {
      const user = await UserModel.findOne({
        attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
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
}
 
export default UserController;