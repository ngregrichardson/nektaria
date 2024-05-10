import type { Config } from "drizzle-kit";

export default {
	schema: "./src/db/schema/*",
	out: "./migrations",
	dialect: "postgresql",
} satisfies Config;
