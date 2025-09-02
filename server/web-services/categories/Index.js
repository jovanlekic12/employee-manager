import con from "../../index.js";
import { responseFactory, errorFactory } from "../../utils/helpers.js";

const categories = [];

categories.push({
  method: "get",
  route: "/categories/department",
  handler: (req, res) => {
    con.query("SELECT * FROM department", (err, result) => {
      if (err) return errorFactory.serverError(res, err);
      return responseFactory.returnGet(
        res,
        result.rows.map((r) => r.name)
      );
    });
  },
});

categories.push({
  method: "get",
  route: "/categories/employment",
  handler: (req, res) => {
    con.query("SELECT * FROM employment", (err, result) => {
      if (err) return errorFactory.serverError(res, err);
      return responseFactory.returnGet(
        res,
        result.rows.map((r) => r.name)
      );
    });
  },
});

export default categories;
