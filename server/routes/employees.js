import express from "express";
import con from "../index.js";

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
  const search = req.query.search ? `%${req.query.search}%` : null;
  const sort = req.query.sort;
  const employment =
    req.query.employment && req.query.employment !== "All"
      ? req.query.employment
      : null;
  const department =
    req.query.department && req.query.department !== "All"
      ? req.query.department
      : null;

  const sortMap = {
    "name-asc": "full_name ASC",
    "name-desc": "full_name DESC",
    "date-asc": "start_date ASC",
    "date-desc": "start_date DESC",
    "training-asc": "training ASC",
    "training-desc": "training DESC",
  };
  const orderBy = sortMap[sort];

  try {
    let whereClauses = [];
    let params = [];
    let paramIndex = 1;

    if (search) {
      whereClauses.push(`full_name ILIKE $${paramIndex++}`);
      params.push(search);
    }

    if (employment) {
      whereClauses.push(`employment = $${paramIndex++}`);
      params.push(employment);
    }

    if (department) {
      whereClauses.push(`department = $${paramIndex++}`);
      params.push(department);
    }

    const whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const total = await con.query(
      `SELECT COUNT(*) FROM employees ${whereSQL}`,
      params
    );

    params.push(limit, offset);
    const result = await con.query(
      `SELECT * FROM employees ${whereSQL} ORDER BY ${orderBy} LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
      params
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

export default router;
