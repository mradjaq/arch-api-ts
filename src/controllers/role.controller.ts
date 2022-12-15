import express from 'express';
import RoleModel from "../models/RoleModel";
import argon2 from "argon2";

class RoleController {
  constructor() {
    // RoleModel.sync();
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

  updateRole = (request: express.Request, response: express.Response) => {}
}

export default RoleController