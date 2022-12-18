import UserModel from "../models/UserModel";
import argon2 from "argon2";
import express from 'express';
import RoleModel from "../models/RoleModel";
import session from "express-session";

export default class Authenthication {
  login = async (request: express.Request, response: express.Response) => {
    try {
      const user = await UserModel.findOne({
        attributes: ['uuid', 'username', 'password','email', 'vehicle_no', 'token', 'createdAt', 'updatedAt', 'roleUuid'],
        where: {
          email: request.body.email
        }
      });
      if (!user) return response.status(404).json({msg: "User tidak ditemukan"});
  
      const match = await argon2.verify(user.password as string, request.body.password);
      if (!match) return response.status(400).json({msg: "Password salah"});
  
      let user_role = await RoleModel.findOne({
        attributes: ['uuid', 'name'],
        where: {
          uuid: user.roleUuid
        }
      })
  
      request.session.user_id = user.uuid as string;
      const uuid = user.uuid
      const name = user.username;
      const email = user.email;
      const role = user_role?.name;
      response.status(200).json({uuid, name, email, role});
    
    } catch (error: any) {
      response.status(500).json({msg: error.message});
    }
  }
  logout = async (request: express.Request, response: express.Response)=> {
    request.session.destroy((err: any) => {
      if (err) return response.status(400).json({msg: "gagal logout"})
      response.status(200).json({msg: "Berhasil logout"})
    })
  }

  Me = async (request: express.Request, response: express.Response)=> {
    if(!request.session.user_id) {
      return response.status(401).json({msg: "Mohon login kembali ke akun anda : "})
    }
    const user = await UserModel.findOne({
      attributes: ['uuid', 'username', 'email', 'roleUuid'],
      where: {
        uuid: request.session.user_id
      }
    });

    
    if (!user) return response.status(404).json({msg: "User tidak ditemukan"});
    let user_role = await RoleModel.findOne({
      attributes: ['uuid', 'name'],
      where: {
        uuid: user?.roleUuid
      }
    })

    const json_response = {
      uuid: user.uuid,
      name: user.username,
      email: user.email,
      role: user_role?.name
    }
    response.status(200).json(json_response);
  }
}