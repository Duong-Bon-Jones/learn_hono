import { handle } from "hono/vercel";
import app from "./app";

Bun.serve({
  fetch: app.fetch,
});

export const GET = handle(app);
export const POST = handle(app);
