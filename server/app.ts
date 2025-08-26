import { Hono } from "hono";
import { logger } from "hono/logger";
import expenses from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono().use(logger());

const apiRoutes = app.basePath("/api").route("/expenses", expenses);

app.get("*", serveStatic({ root: "./client/.output/public" }));
app.get("*", serveStatic({ path: "./client/.output/public/_shell.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
