import Sequelize, { Model } from "sequelize";
import db from "../db";
import Reservation from "./ReservationModel";

const { DataTypes } = Sequelize;

const ParkingSpot = db.define<ParkingSpotInstance>('parkingspot', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  floor: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  spot_no: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
}, {
  freezeTableName: true
})

Reservation.hasOne(ParkingSpot);
ParkingSpot.belongsTo(Reservation, { foreignKey: {
  name: 'reservationUuid',
  field: 'reservationUuid',
} , foreignKeyConstraint: true})

export default Reservation;
interface IParkingSpot {
  uuid?: string;
  floor: number;
  spot_no: number;
  status: string;
}
interface ParkingSpotInstance
  extends Model<IParkingSpot>,
    IParkingSpot {
      createdAt?: Date;
      updatedAt?: Date;
    }