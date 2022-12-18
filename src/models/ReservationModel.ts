import Sequelize from "sequelize";
import Model from "sequelize/types/model";
import db from "../db";
import Users from "./UserModel";

const { DataTypes } = Sequelize;

const Reservation = db.define<ReservationInstance>('reservation', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: true,
    // validate: {
    //   notEmpty: true
    // }
  },
  parking_spot_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
    }
  },
  // user_uuid: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   }
  // }
}, {
  freezeTableName: true
})


export default Reservation;

export interface IReservation {
  uuid?: string;
  parking_spot_id?: string;
  fee: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReservationInstance extends Model<IReservation>, IReservation {
  createdAt?: Date;
  updatedAt?: Date;
}