import { asyncHandler } from "../../utils/asyncHandler.js";
import * as svc from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await svc.register(req.validated.body);
  res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await svc.login(req.validated.body);

  // Session support (optional)
  req.session.userId = user.id;

  res.json({ user, accessToken, refreshToken });
});

export const refresh = asyncHandler(async (req, res) => {
  res.json(await svc.refresh(req.validated.body));
});

export const logout = asyncHandler(async (req, res) => {
  req.session.destroy(() => res.status(204).send());
});
