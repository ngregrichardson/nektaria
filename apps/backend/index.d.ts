import type { db } from "./src/db";

declare module "hono" {
	interface ContextVariableMap {
		db: typeof db;
	}
}
