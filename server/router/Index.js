import express from "express";
import users from "../web-services/users/Index.js";
import employees from "../web-services/employees/Index.js";
import categories from "../web-services/categories/Index.js";
import auth from "../web-services/auth/Index.js";

const webServices = [employees, categories, users, auth];

const router = express.Router();

webServices.flat().forEach(({ method, route, handler }) => {
  router[method](route, handler);
});

export default router;
