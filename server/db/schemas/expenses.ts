import { serial, text, numeric, pgTable, timestamp } from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
