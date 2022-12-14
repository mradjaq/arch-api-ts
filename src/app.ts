import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

import AppRoutes from './routes/index'; 
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

import { mySqlConnection, mysql_connection } from "./server";
import db_seq from "./db";

declare module 'express-session' {
  interface SessionData {
    user_id: string;
  }
}


dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

export default class App {
  public app: express.Application = express();
  public port: number = parseInt(process.env.PORT as string, 10 || 200);
  appRoutes = new AppRoutes()

  constructor() {
    this.initMiddlewares();
    this.initAllApiRoutes(this.appRoutes.routers);
  }

  test() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hi (^_^)V || You doing well');
    })

    this.app.post('/', (req: Request, res: Response) => {
      res.send({
        data: req.body
      });
    })

    // test get data from remote database
    // this.app.get('/test-get', (req: Request, res: Response) => {
    //   let query = "SELECT * FROM radjaparking.test;"
    //   mysql_connection.query(query, (err: any, result: any) => {
    //     if (err) console.log("ERR", err);        
    //     else res.send({
    //       data: result
    //     })
        
    //   })
    // })

  }

  initMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(session({
      resave: false,
      saveUninitialized: false,
      secret: 't@1k0ch3ng',
      name: 'secretName',
      cookie: {
          sameSite: true,
          maxAge: 60000
      },
  }))
  }

  // Initialize all the routes of the application
  initAllApiRoutes(router: any[]) {
    router.forEach(routes => {
      this.app.use('/', routes);
    });
  }

  // Server will listen current port
  serverListener() {
    this.app.listen(this.port, () => {
      console.log(`Arch API listening PORT ${this.port}`)
    });
  }

  
  async connectToMySql() {
    // await db_seq.authenticate().then(async () => {
      await db_seq.sync();
    // })
    // .then(res => {
    //   console.log('log res', res)
    // }).catch(err => {
      
      

    //   console.log('seq err', err)
    // });
    // mySqlConnection();
  }
}