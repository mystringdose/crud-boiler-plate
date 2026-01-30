import request from "supertest";
import { createApp } from "../src/app.js";

describe("Auth routes shape", () => {
  it("register validates input", async () => {
    const app = createApp();
    const res = await request(app).post("/api/auth/register").send({ email: "bad", password: "x" });
    expect(res.statusCode).toBe(400);
  });
});
