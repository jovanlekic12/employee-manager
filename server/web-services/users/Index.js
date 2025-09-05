import { checkSchema, validationResult } from "express-validator";
import con from "../../index.js";
import { responseFactory, errorFactory } from "../../utils/helpers.js";
import bcrypt from "bcrypt";
import { NewUserValidationSchema } from "../../validation/NewUserValidation.js";
import { jwtTokens } from "../../utils/jwt-helpers.js";
const users = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

users.push({
  method: "post",
  route: "/users",
  handler: [
    checkSchema(NewUserValidationSchema),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await con.query(
        "SELECT * FROM users WHERE email = $1",
        [req.body.email]
      );
      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          errors: [
            { path: "email", msg: "User with this email already exists" },
          ],
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await con.query(
          "INSERT INTO users (full_name,email,password) VALUES ($1,$2,$3) RETURNING *",
          [req.body.full_name, req.body.email, hashedPassword]
        );
        res.json(jwtTokens(newUser.rows[0]));
      } catch (error) {
        errorFactory.serverError(res, error);
      }
    },
  ],
});

users.push({
  method: "get",
  route: "/user",
  handler: [
    authenticateToken,
    async (req, res) => {
      try {
        const userId = req.user.id;
        console.log(req);
        const result = await con.query("SELECT * FROM users WHERE id = $1", [
          userId,
        ]);

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],
});

export default users;
