import { createFactory } from "hono/factory";
import { setupDatabaseConnection, db } from "~/db";

export const factory = createFactory<{
	Variables: {
		db: typeof db;
	};
}>({
	initApp: (app) => {
		app.use(async (c, next) => {
			setupDatabaseConnection();

			await db.transaction(async (tx) => {
				c.set("db", tx);
				await next();
			});
		});
	},
});
