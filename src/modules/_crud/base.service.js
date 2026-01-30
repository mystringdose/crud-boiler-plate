import { ApiError } from "../../utils/apiError.js";

export function makeCrudService(Model, { searchableFields = [] } = {}) {
  return {
    async create(data) {
      const doc = await Model.create(data);
      return doc;
    },

    async list({ skip = 0, limit = 20, sort = "-createdAt", search = null } = {}) {
      const filter = {};

      if (search && searchableFields.length) {
        filter.$or = searchableFields.map((f) => ({ [f]: { $regex: search, $options: "i" } }));
      }

      const [items, total] = await Promise.all([
        Model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        Model.countDocuments(filter)
      ]);

      return { items, total };
    },

    async getById(id) {
      const doc = await Model.findById(id).lean();
      if (!doc) throw new ApiError(404, "Not found");
      return doc;
    },

    async update(id, patch) {
      const doc = await Model.findByIdAndUpdate(id, patch, { new: true }).lean();
      if (!doc) throw new ApiError(404, "Not found");
      return doc;
    },

    async remove(id) {
      const doc = await Model.findByIdAndDelete(id).lean();
      if (!doc) throw new ApiError(404, "Not found");
      return true;
    }
  };
}
