const express = require("express");

module.exports = (con) => {
  const router = express.Router();

  router.get("/department", (req, res) => {
    con.query("SELECT * FROM department", (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result.rows.map((r) => r.name));
    });
  });

  router.get("/employment", (req, res) => {
    con.query("SELECT * FROM employment", (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result.rows.map((r) => r.name));
    });
  });

  return router;
};
