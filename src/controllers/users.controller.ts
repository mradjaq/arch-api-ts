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
  //     let query = `SELECT * FROM radjaparking.test WHERE name='${request.body.name}';`
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
      const res = await UserModel.findAll();
      response.status(200).json(res)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }
  getUserByUUID = async (request: express.Request, response: express.Response) => {
    try {
      const res = await UserModel.findOne({
        where: {
          uuid: request.params.id
        }
      });
      response.status(200).json(res)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }
  createUser = async (request: express.Request, response: express.Response) => {
    const {name, email, password, confPassword, role} = request.body;
    if (password !== confPassword) return response.status(400).json({
      msg: 'Password dan Password konfirmasi tidak sama'
    })
    
    const hashPassword = await argon2.hash(password)
    try {
      
    } catch (error) {
      
    }
  }
  updateUser = (request: express.Request, response: express.Response) => {}
  deleteUser = (request: express.Request, response: express.Response) => {}
  
}
 
export default UserController;