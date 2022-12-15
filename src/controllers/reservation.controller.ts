import express from 'express';
import ReservationModel from "../models/ReservationModel";
import argon2 from "argon2";

class ReservationController {
  constructor() {
    ReservationModel.sync();
  }
}

export default ReservationController