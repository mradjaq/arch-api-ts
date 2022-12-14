import mySql from "mysql";
import * as dotenv from "dotenv";
// import { Sequelize } from "sequelize";
dotenv.config();

// export const mysql_connection = mySql.createConnection({
//   host: 'first-architect.online',
//   port: 3306,
//   database: 'u378097923_arch_parking',
//   user: 'u378097923_architect_park',
//   password: 'Parkingarchitect1'
// })

// const DB_Sequelize = new Sequelize('radjaparking', 'foqmnvgjwkqr8ld9ap7x', 'pscale_pw_aIOcoWPGE9YCB5YR1pft1dNEF5oOMRhZWkgPUpurNpc', {
//   host: 'ap-southeast.connect.psdb.cloud',
//   dialect: 'mysql'
// })
export let mysql_connection: any
export function mySqlConnection() {
  mysql_connection = mySql.createConnection('mysql://foqmnvgjwkqr8ld9ap7x:pscale_pw_aIOcoWPGE9YCB5YR1pft1dNEF5oOMRhZWkgPUpurNpc@ap-southeast.connect.psdb.cloud/radjaparking?ssl={"rejectUnauthorized":true}')

  mysql_connection.connect((err: any) => {
    if(err) {
      console.log('SQL error occured while connecting', err);
    } else {
      console.log('connection with mySql Successfully created')
      // var sql = "SELECT * FROM radjaparking.test;"
      // mysql_connection.query(sql, function (err, result) {
      //   if (err) throw err;
      //   console.log("1 record inserted", result);
      // });
    }
  })

  return mysql_connection
}
// console.log('mysql_connection', mysql_connection);


/**
 * PLanetScale
 * */
// database: radjaparking
// username: foqmnvgjwkqr8ld9ap7x
// host: ap-southeast.connect.psdb.cloud
// password: pscale_pw_aIOcoWPGE9YCB5YR1pft1dNEF5oOMRhZWkgPUpurNpc

