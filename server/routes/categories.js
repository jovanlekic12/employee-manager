import express from "express";
import { responseFactory, errorFactory } from "../utils/helpers.js";
import con from "../index.js";
const router = express.Router();

router.get("/department", (req, res) => {
  con.query("SELECT * FROM department", (err, result) => {
    if (err) return errorFactory.serverError(res, err);
    return responseFactory.returnGet(
      res,
      result.rows.map((r) => r.name)
    );
  });
});

router.get("/employment", (req, res) => {
  con.query("SELECT * FROM employment", (err, result) => {
    if (err) return errorFactory.serverError(res, err);
    return responseFactory.returnGet(
      res,
      result.rows.map((r) => r.name)
    );
  });
});

export default router;
