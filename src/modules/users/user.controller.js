import { asyncHandler } from "../../utils/asyncHandler.js";
import * as svc from "./user.service.js";

export const create = asyncHandler(async (req, res) => {
  const user = await svc.createUser(req.validated.body);
  res.status(201).json(user);
});

export const list = asyncHandler(async (_req, res) => {
  res.json(await svc.listUsers());
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.validated.params;
  res.json(await svc.updateUser(id, req.validated.body));
});

export const remove = asyncHandler(async (req, res) => {
  await svc.deleteUser(req.params.id);
  res.status(204).send();
});
