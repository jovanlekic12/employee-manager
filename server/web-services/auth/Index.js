import bcrypt from "bcrypt";
import con from "../../index.js";
import { jwtTokens } from "../../utils/jwt-helpers.js";
import jwt from "jsonwebtoken";
import { checkSchema, validationResult } from "express-validator";
import { LogInValidationSchema } from "../../validation/LogInValidationSheme.js";

const auth = [];

auth.push({
  method: "post",
  route: "/login",
  handler: [
    checkSchema(LogInValidationSchema),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        console.log(req.cookies, req.get("origin"));
        const { email, password } = req.body;

        const users = await con.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);

        if (users.rows.length === 0)
          return res.status(401).json({ error: "Email is incorrect" });

        const validPassword = await bcrypt.compare(
          password,
          users.rows[0].password
        );

        if (!validPassword)
          return res.status(401).json({ error: "Incorrect password" });

        const tokens = jwtTokens(users.rows[0]);

        res.json(tokens);
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    },
  ],
});

export default auth;
