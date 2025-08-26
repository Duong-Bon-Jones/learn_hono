import { Hono } from "hono";

import * as z from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
  id: z.number().int().positive().min(1),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    amount: 190,
    title: "Item 1",
  },
  {
    id: 2,
    amount: 2234,
    title: "Item 2",
  },
  {
    id: 3,
    amount: 3125,
    title: "Item 3",
  },
];

const expenses = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const validated = c.req.valid("json");
    fakeExpenses.push({ ...validated, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(validated);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = c.req.param("id");

    const expense = fakeExpenses.find((e) => e.id === parseInt(id));

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = c.req.param("id");

    const index = fakeExpenses.findIndex((e) => e.id === parseInt(id));

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];

    return c.json({ expense: deletedExpense });
  })
  .get("total-spent", (c) => {
    const total = fakeExpenses.reduce((total, { amount }) => total + amount, 0);
    return c.json({ total });
  });

export default expenses;
