import { pgTable, text } from "drizzle-orm/pg-core";
import typeId from "../types/typeId";

export const customersTable = pgTable("customers", {
	id: typeId("id", "cus", true).primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
});
