import cors from "cors";
import logger from "morgan";
import express from "express";
import bodyParser from 'body-parser';
import { router } from "./routes/index.js";

export const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
const port = "4001";
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));

app.use("/api", router);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
