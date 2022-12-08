"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const parking_api = new app_1.default();
parking_api.serverListener();
parking_api.connectToMySql();
parking_api.test();
// OLD
// dotenv.config();
// if (!process.env.PORT) {
//   process.exit(1);
// }
// const PORT: number = parseInt(process.env.PORT as string, 10 || 200);
// const app = express();
// /**
//  * Use all depedencies 3rd partu
//  */
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// mySqlConnection();
// app.use("/api/menu/items", itemsRouter);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hi (^_^)V || You doing well');
// })
// app.post('/', (req: Request, res: Response) => {
//   res.send({
//     data: req.body
//   });
// })
// // app.use(errorHandler);
// // app.use(notFoundHandler);
// app.get('*', function(req: Request, res: Response) {
//   const message = "Resource not found";
//   res.status(404).send(message);
// });
// app.listen(PORT, () => {
//   console.log(`Arch API listening PORT ${PORT}`)
// })
