const { Client } = require("pg");
const cors = require("cors");
const express = require("express");

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

const employeesRoute = require("./routes/employees")(con);
const categoriesRoute = require("./routes/categories")(con);
app.use("/employees", employeesRoute);
app.use("/", categoriesRoute);

module.exports = con;
