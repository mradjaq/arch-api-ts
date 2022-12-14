import { Sequelize } from "sequelize";

const DB_Sequelize = new Sequelize('u378097923_arch_parking', 'u378097923_architect_park', 'Parkingarchitect1', {
  host: 'first-architect.online',
  port: 3306,
  dialect: 'mysql'
})

export default DB_Sequelize;