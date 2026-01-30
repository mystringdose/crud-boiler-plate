import { User } from "../users/user.model.js";
import { ApiError } from "../../utils/apiError.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/tokens.js";

export async function register({ email, password }) {
  const exists = await User.findOne({ email }).lean();
  if (exists) throw new ApiError(409, "Email already in use");

  const passwordHash = await hashPassword(password);
  const doc = await User.create({ email, passwordHash });

  return { id: doc._id.toString(), email: doc.email, role: doc.role };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw new ApiError(401, "Invalid credentials");

  const payload = { sub: user._id.toString(), role: user.role };
  return {
    user: { id: payload.sub, email: user.email, role: user.role },
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload)
  };
}

export async function refresh({ refreshToken }) {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const payload = { sub: decoded.sub, role: decoded.role };
    return { accessToken: signAccessToken(payload) };
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }
}
