const express = require("express");

module.exports = (con) => {
  const router = express.Router();

  router.post("/", (req, res) => {
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
      "INSERT INTO employees (id, full_name, adress, start_date, employment, department, training) VALUES ($1,$2,$3,$4,$5,$6,$7)";

    con.query(
      insert_query,
      [id, full_name, adress, start_date, employment, department, training],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send("posted");
        }
      }
    );
  });

  router.get("/", (req, res) => {
    con.query("SELECT * FROM department", (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result.rows.map((r) => r.name));
    });
  });

  router.get("/employments", (req, res) => {
    con.query("SELECT * FROM employment", (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result.rows.map((r) => r.name));
    });
  });

  router.get("/", (req, res) => {
    con.query("SELECT * FROM employees", (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result.rows);
    });
  });

  return router;
};
