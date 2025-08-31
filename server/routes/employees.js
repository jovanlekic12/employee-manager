import express from "express";
import con from "../index.js";
import { errorFactory } from "../utils/helpers.js";
import { validationResult, body, checkSchema } from "express-validator";
import { employeeValidationSchema } from "../validation/EmployeeValidationSchema.js";

const router = express.Router();

router.post("/", checkSchema(employeeValidationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
        res.status(500).json({ message: "Database insert failed" });
      } else {
        res.status(201).json({
          message: "Employee created",
          employee: {
            id,
            full_name,
            adress,
            start_date,
            employment,
            department,
            training,
          },
        });
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
    errorFactory.serverError();
  }
});

router.put("/:id", checkSchema(employeeValidationSchema), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { full_name, adress, start_date, employment, department, training } =
    req.body;

  try {
    const update_query = `
        UPDATE employees
        SET full_name = $1,
            adress = $2,
            start_date = $3,
            employment = $4,
            department = $5,
            training = $6
        WHERE id = $7
        RETURNING *;
      `;

    const result = await con.query(update_query, [
      full_name,
      adress,
      start_date,
      employment,
      department,
      training,
      id,
    ]);

    res.json({ message: "Employee updated", employee: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const delete_query = "DELETE FROM employees WHERE id = $1 RETURNING *";
    const result = await con.query(delete_query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted", employee: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
