import express from "express";
import employees from "../web-services/employees/index.js";
import categories from "../web-services/categories/index.js";

const webServices = [employees, categories];

const router = express.Router();

webServices.flat().forEach(({ method, route, handler }) => {
  router[method](route, handler);
});

export default router;
