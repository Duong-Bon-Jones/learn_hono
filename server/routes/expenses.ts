import { Hono } from "hono";

import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { expenses as expensesTable } from "../db/schemas/expenses";
import { desc, eq, sum } from "drizzle-orm";

const expenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.string(),
  id: z.number().int().positive().min(1),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const expensesRoute = new Hono()
  .get("/", async (c) => {
    const expenses = await db
      .select()
      .from(expensesTable)
      .orderBy(desc(expensesTable.created_at));

    return c.json({ expenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const validated = c.req.valid("json");

    const res = await db.insert(expensesTable).values(validated).returning();
    c.status(201);
    return c.json(res);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = c.req.param("id");

    const expense = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.id, Number(id)))
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = c.req.param("id");

    const deletedExpense = await db
      .delete(expensesTable)
      .where(eq(expensesTable.id, Number(id)))
      .returning()
      .then((res) => res[0]);

    if (!deletedExpense) {
      return c.notFound();
    }

    return c.json({ expense: deletedExpense });
  })
  .get("total-spent", async (c) => {
    const res = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .limit(1)
      .then((res) => res[0]);

    return c.json(res);
  });

export default expensesRoute;
