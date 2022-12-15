import express from 'express';
import RoleModel from "../models/RoleModel";
import argon2 from "argon2";

class RoleController {
  constructor() {
    RoleModel.sync();
  }

  createRole = async (request: express.Request, response: express.Response) => {
    const { name } = request.body;
    try {
      await RoleModel.create({
        name: name,
      });
      response.status(201).json({msg: "Berhasil membuat Role"})
    } catch (error: any) {
      response.status(400).json({msg: error.message})
    }
  }

  getAllRole = async (request: express.Request, response: express.Response) => {
    try {
      const roles = await RoleModel.findAll();
      
      response.status(200).json(roles)
    } catch (error: any) {
      response.status(500).json({msg: error.message})
    }
  }

  updateRole = async (request: express.Request, response: express.Response) => {
    const uuid = request.params.uuid;
    try {
      const role = await RoleModel.findOne({
        where: {
          uuid
        }
      });

      if(!role) return response.status(404).json({msg: "User tidak dapat ditemukan"})

      const { name } = request.body;
      await RoleModel.update({ name }, {
        where: { uuid }
      });

      response.status(201).json({msg: "Berhasil Merubah nama Role"});
    } catch (error: any) {
      response.status(400).json({msg: error.message})
    }
  }
}

export default RoleController