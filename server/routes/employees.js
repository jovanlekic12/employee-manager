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

  router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const total = await con.query("SELECT COUNT(*) FROM employees");
      const result = await con.query(
        "SELECT * FROM employees ORDER BY id LIMIT $1 OFFSET $2",
        [limit, offset]
      );

      res.json({
        page,
        limit,
        total: parseInt(total.rows[0].count),
        totalPages: Math.ceil(total.rows[0].count / limit),
        data: result.rows,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  });

  return router;
};
