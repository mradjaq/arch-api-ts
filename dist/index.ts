import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}





const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi (^_^)V || You doing well');
})

app.listen(PORT, () => {
  console.log(`Arch API listening PORT ${PORT}`)
})