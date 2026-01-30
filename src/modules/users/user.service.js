import { User } from "./user.model.js";
import { ApiError } from "../../utils/apiError.js";
import { hashPassword } from "../../utils/password.js";

export async function createUser({ email, password, role }) {
  const exists = await User.findOne({ email }).lean();
  if (exists) throw new ApiError(409, "Email already in use");

  const passwordHash = await hashPassword(password);
  const doc = await User.create({ email, passwordHash, role });

  return { id: doc._id.toString(), email: doc.email, role: doc.role };
}

export async function listUsers() {
  return User.find().select("_id email role createdAt").lean();
}

export async function updateUser(id, patch) {
  const doc = await User.findByIdAndUpdate(id, patch, { new: true })
    .select("_id email role")
    .lean();

  if (!doc) throw new ApiError(404, "User not found");
  return doc;
}

export async function deleteUser(id) {
  const doc = await User.findByIdAndDelete(id).lean();
  if (!doc) throw new ApiError(404, "User not found");
  return true;
}
