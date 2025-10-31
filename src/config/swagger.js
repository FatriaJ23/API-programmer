import swaggerUi from "swagger-ui-express";

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Nutech API",
    version: "1.0.0",
    description: "API documentation for Nutech Balance System",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    // registration
    "/registration": {
      post: {
        summary: "User Registration (Public)",
        description: `
Digunakan untuk melakukan registrasi user baru agar dapat login ke sistem.
        `,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@nutech-integrasi.com" },
                  name: { type: "string", example: "User" },
                  password: { type: "string", example: "abcdef1234" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Registrasi berhasil",
            content: {
              "application/json": {
                example: {
                  status: "success",
                  message: "Registration successful",
                },
              },
            },
          },
        },
      },
    },
    // login
    "/login": {
      post: {
        summary: "Login user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@nutech-integrasi.com" },
                  password: { type: "string", example: "abcdef1234" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login berhasil",
            content: {
              "application/json": {
                example: {
                  status: "success",
                  message: "Login successful",
                  token: "JWT_TOKEN_HERE",
                },
              },
            },
          },
        },
      },
    },

    // balance
    "/balance": {
      get: {
        summary: "Check current balance",
        tags: ["User Balance"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                example: {
                  saldo: 125000,
                },
              },
            },
          },
          401: { description: "Token missing or invalid" },
        },
      },
    },

    // topup
    "/topup": {
      post: {
        summary: "Top up user balance",
        tags: ["User Balance"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { amount: { type: "number", example: 50000 } },
                required: ["amount"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Top-up success",
            content: {
              "application/json": {
                example: {
                  status: "success",
                  message: "Top-up successful",
                  new_balance: 175000,
                },
              },
            },
          },
          400: { description: "Invalid top-up amount" },
        },
      },
    },

    // transaction
    "/transaction": {
      post: {
        summary: "Make a payment transaction",
        tags: ["User Balance"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  amount: { type: "number", example: 25000 },
                  description: { type: "string", example: "Beli Pulsa" },
                },
                required: ["amount"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Transaction success",
            content: {
              "application/json": {
                example: {
                  status: "success",
                  message: "Transaction successful",
                  new_balance: 150000,
                },
              },
            },
          },
          400: { description: "Invalid transaction amount" },
        },
      },
    },
  },
};

export { swaggerUi };
