const { Client } = require("pg");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

app.post("/postdata", (req, res) => {
  const {
    id,
    full_name,
    adress,
    start_date,
    employment,
    department,
    training,
  } = req.body;

  const insert_query =
    "INSERT INTO employees (id,full_name,adress,start_date,employment,department,training) VALUES ($1,$2,$3,$4,$5,$6,$7)";

  con.query(
    insert_query,
    [id, full_name, adress, start_date, employment, department, training],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(result);
        res.send("posted");
      }
    }
  );
});

app.get("/fetchDepartment", (req, res) => {
  const fetch_query = "Select * from department";

  con.query(fetch_query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows.map((r) => r.name));
    }
  });
});

app.get("/fetchEmployment", (req, res) => {
  const fetch_query = "Select * from employment";

  con.query(fetch_query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows.map((r) => r.name));
    }
  });
});

app.get("/fetchEmployees", (req, res) => {
  const fetch_query = "Select * from employees";

  con.query(fetch_query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
});

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 9000,
  password: "kuratiprogramer11",
  database: "employees",
});

con.connect().then(() => console.log("connected"));

app.listen(3000);
