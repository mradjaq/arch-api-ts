import express from 'express';
import { mySqlConnection, mysql_connection } from "../server";
// import UserModel from '../models/user';

class UserController {
	// Object of User model
  
  getTest = (request: express.Request, response: express.Response) => {
    console.log('Requset', request.body)
      let query = `SELECT * FROM radjaparking.test WHERE name='${request.body.name}';`
      mysql_connection.query(query, (err: any, result: any) => {
        if (err) console.log("ERR", err);        
        else response.send({
          data: result
        })
        
      })
  }
      // Business Logic for GET API
	// getAllPosts = (request: express.Request, response: express.Response) => {
	// 	response.send(this.posts);
	// }

  //    // Business Logic for POST API
	// createAPost = (request, response) => {
  //          // Moongo DB Insert Operation
	// 	this.user.saveUser(this.posts, (err, user) => {
	// 		if (err) {
	// 			response.send(err)
	// 		} else {
	// 			response.send(user);
	// 		}
	// 	})
	// }
}
 
export default UserController;