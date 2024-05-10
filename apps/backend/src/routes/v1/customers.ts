import { customersTable } from "~/db/schema";
import { factory } from "~/setup/factory";

const app = factory.createApp().get("/", async (c) => {
	const db = c.get("db");
	const customers = await db.select().from(customersTable);

	return c.json(customers);
});

export { app as customerRoutes };
