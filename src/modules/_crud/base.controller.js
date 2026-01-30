import { asyncHandler } from "../../utils/asyncHandler.js";
import { parseListQuery } from "./query.js";

export function makeCrudController(service) {
  return {
    create: asyncHandler(async (req, res) => {
      const doc = await service.create(req.validated.body);
      res.status(201).json(doc);
    }),

    list: asyncHandler(async (req, res) => {
      const q = parseListQuery(req.query);
      const data = await service.list(q);
      res.json({ ...data, page: q.page, limit: q.limit });
    }),

    getById: asyncHandler(async (req, res) => {
      const doc = await service.getById(req.params.id);
      res.json(doc);
    }),

    update: asyncHandler(async (req, res) => {
      const doc = await service.update(req.params.id, req.validated.body);
      res.json(doc);
    }),

    remove: asyncHandler(async (req, res) => {
      await service.remove(req.params.id);
      res.status(204).send();
    })
  };
}
