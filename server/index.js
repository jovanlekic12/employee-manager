import { Client } from "pg";
import cors from "cors";
import express from "express";
import employeesRoute from "./routes/employees.js";
import categoriesRoute from "./routes/categories.js";
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 9000,
  password: "kuratiprogramer11",
  database: "employees",
});

con.connect().then(() => console.log("connected"));

app.listen(3000);

app.use("/employees", employeesRoute);
app.use("/", categoriesRoute);

export default con;
