import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireJwt } from "../../middlewares/auth.js";
import * as c from "./user.controller.js";
import { createUserSchema, updateUserSchema } from "./user.schemas.js";

const r = Router();

r.get("/", requireJwt, c.list);
r.post("/", requireJwt, validate(createUserSchema), c.create);
r.patch("/:id", requireJwt, validate(updateUserSchema), c.update);
r.delete("/:id", requireJwt, c.remove);

export default r;
