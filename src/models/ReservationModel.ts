import Sequelize from "sequelize";
import db from "../db";
import Users from "./UserModel";

const { DataTypes } = Sequelize;

const Reservation = db.define('reservation', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
    allowNull: true,
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

Users.hasOne(Reservation);
Reservation.belongsTo(Users, { foreignKey: 'user_uuid' })

export default Reservation;