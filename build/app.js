"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("./routes/index"));
const db_1 = __importDefault(require("./db"));
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT, 10 || 200);
        this.appRoutes = new index_1.default();
        this.initMiddlewares();
        this.initAllApiRoutes(this.appRoutes.routers);
    }
    test() {
        this.app.get('/', (req, res) => {
            res.send('Hi (^_^)V || You doing well');
        });
        this.app.post('/', (req, res) => {
            res.send({
                data: req.body
            });
        });
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
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, express_session_1.default)({
            resave: false,
            saveUninitialized: false,
            secret: 't@1k0ch3ng',
            name: 'secretName',
            cookie: {
                sameSite: true,
                maxAge: 60000
            },
        }));
    }
    // Initialize all the routes of the application
    initAllApiRoutes(router) {
        router.forEach(routes => {
            this.app.use('/', routes);
        });
    }
    // Server will listen current port
    serverListener() {
        this.app.listen(this.port, () => {
            console.log(`Arch API listening PORT ${this.port}`);
        });
    }
    connectToMySql() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.sync(({ force: true })).then(res => {
                console.log('log res', res);
            }).catch(err => {
                console.log('seq err', err);
            });
            // mySqlConnection();
        });
    }
}
exports.default = App;
