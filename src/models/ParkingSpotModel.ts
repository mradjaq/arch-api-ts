import Sequelize from "sequelize";
import db from "../db";
import Reservation from "./ReservationModel";

const { DataTypes } = Sequelize;

const ParkingSpot = db.define('parkingspot', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
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
  // reservation_uuid: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   }
  // },
}, {
  freezeTableName: true
})

Reservation.hasOne(ParkingSpot);
ParkingSpot.belongsTo(Reservation, { foreignKey: 'reservation_uuid' })

export default Reservation;