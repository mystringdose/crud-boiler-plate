import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { registerSchema, loginSchema, refreshSchema } from "./auth.schemas.js";
import * as c from "./auth.controller.js";

const r = Router();

r.post("/register", validate(registerSchema), c.register);
r.post("/login", validate(loginSchema), c.login);
r.post("/refresh", validate(refreshSchema), c.refresh);
r.post("/logout", c.logout);

export default r;
