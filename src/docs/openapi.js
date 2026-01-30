export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Node CRUD Boilerplate API",
    version: "1.0.0"
  },
  servers: [{ url: "http://localhost:3000" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    }
  },
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: { "200": { description: "OK" } }
      }
    },
    "/api/auth/register": {
      post: { summary: "Register", responses: { "201": { description: "Created" } } }
    },
    "/api/auth/login": {
      post: {
        summary: "Login (sets session + returns JWT tokens)",
        responses: { "200": { description: "OK" }, "401": { description: "Invalid credentials" } }
      }
    },
    "/api/auth/refresh": {
      post: { summary: "Refresh access token", responses: { "200": { description: "OK" } } }
    },
    "/api/auth/logout": {
      post: { summary: "Logout (destroys session)", responses: { "204": { description: "No Content" } } }
    },
    "/api/users": {
      get: {
        summary: "List users (JWT required)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK" }, "401": { description: "Unauthorized" } }
      },
      post: {
        summary: "Create user (JWT required)",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/users/{id}": {
      patch: {
        summary: "Update user role (JWT required)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true }],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } }
      },
      delete: {
        summary: "Delete user (JWT required)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true }],
        responses: { "204": { description: "No Content" }, "404": { description: "Not found" } }
      }
    }
  }
};
