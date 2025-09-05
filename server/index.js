import express from "express";
import cors from "cors";
import apiRouter from "./router/Index.js";
import dotenv from "dotenv";
import { Client } from "pg";

const app = express();
dotenv.config();

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 9000,
  password: "kuratiprogramer11",
  database: "employees",
});

con.connect().then(() => console.log("Postgres connected"));
export default con;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", apiRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
