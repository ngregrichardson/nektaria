import { test } from "vitest";
import app from "../../src";
import type { DbContext } from "~/db";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/postgres-js/migrator";

export const apiTest = test.extend({
	api: app,
});

export const truncateDb = async (db: DbContext) => {
	const tables: { tablename: string }[] = await db.execute(
		sql`SELECT tablename FROM pg_catalog.pg_tables WHERE tablename not ilike 'pg_%' and tablename not ilike 'sql_%' and tablename not ilike '__drizzle%'`,
	);

	await db.execute(sql`SET session_replication_role = 'replica'`);

	const truncationSequence = sql.empty();

	for (const { tablename } of tables) {
		truncationSequence.append(sql`DELETE FROM ${sql.identifier(tablename)}; `);
	}

	await db.execute(truncationSequence);

	await db.execute(sql`SET session_replication_role = 'origin'`);
};

export const applyMigrations = async (db: DbContext) => {
	return migrate(db, {
		migrationsFolder: "./migrations",
	});
};
