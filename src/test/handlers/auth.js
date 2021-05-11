import { rest } from "msw";

const authHandlers = [
  // Sign in handler
  rest.post(`${process.env.REACT_APP_AUTH_API_URL}/signin`, (req, res, ctx) => {
    return req.body.identifier
      ? res(ctx.status(200), ctx.json({ user: {}, token: "" }))
      : res(ctx.status(500), ctx.json({ error: "Server Error" }));
  }),
  // Sign up handler
  rest.post(`${process.env.REACT_APP_AUTH_API_URL}/signup`, (req, res, ctx) => {
    return req.body.username
      ? res(ctx.status(200), ctx.json({ user: {}, token: "" }))
      : res(ctx.status(500), ctx.json({ error: "Server Error" }));
  }),
];

export default authHandlers;
