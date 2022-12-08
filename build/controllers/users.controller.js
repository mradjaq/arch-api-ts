"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
// import UserModel from '../models/user';
class UserController {
    constructor() {
        // Object of User model
        this.getTest = (request, response) => {
            console.log('Requset', request.body);
            let query = `SELECT * FROM radjaparking.test WHERE name='${request.body.name}';`;
            server_1.mysql_connection.query(query, (err, result) => {
                if (err)
                    console.log("ERR", err);
                else
                    response.send({
                        data: result
                    });
            });
        };
        this.testHalo = (request, response) => {
            response.send('GALLOOO');
        };
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
}
exports.default = UserController;
