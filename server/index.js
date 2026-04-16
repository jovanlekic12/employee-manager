import express from "express";
import cors from "cors";
import apiRouter from "./router/Index.js";
import dotenv from "dotenv";
import { Client } from "pg";

const app = express();
dotenv.config();

const con = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con
  .connect()
  .then(() => console.log("Postgres connected"))
  .catch((err) => console.error("DB ERROR:", err));
export default con;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", apiRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
