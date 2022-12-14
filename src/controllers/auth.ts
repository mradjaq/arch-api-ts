import UserModel from "../models/UserModel";
import argon2 from "argon2";
import express from 'express';
import session from "express-session";

export default class Authenthication {
  login = async (request: express.Request, response: express.Response) => {
    const user = await UserModel.findOne({
      attributes: ['uuid', 'username', 'password','email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
      where: {
        email: request.body.email
      }
    });
    if (!user) return response.status(404).json({msg: "User tidak ditemukan"});

    const match = await argon2.verify(user.password, request.body.password);
    if (!match) return response.status(400).json({msg: "Password salah"}); 

    request.session.user_id = user.uuid as string;
    const uuid = user.uuid
    const name = user.username;
    const email = user.email;

    response.status(200).json({uuid, name, email});
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
      attributes: ['uuid', 'username', 'email'],
      where: {
        uuid: request.session.user_id
      }
    });

    if (!user) return response.status(404).json({msg: "User tidak ditemukan"});
    response.status(200).json(user);
  }
}