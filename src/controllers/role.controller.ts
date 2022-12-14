import express from 'express';
import RoleModel from "../models/RoleModel";
import argon2 from "argon2";

class RoleController {
  constructor() {
    RoleModel.sync();
  }
}

export default RoleController