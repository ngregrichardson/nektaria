import {
	PostgreSqlContainer,
	type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import type { Sql } from "postgres";
import { afterAll, beforeAll, beforeEach } from "vitest";
import { setupDatabaseConnection, type DbContext } from "~/db";
import { applyMigrations, truncateDb } from "./tests";

export interface CustomTestContext {
	db: DbContext;
	dbClient: Sql;
}

declare module "vitest" {
	export interface TestContext extends CustomTestContext {}
}

let db: DbContext;
let dbClient: Sql;
let dbContainer: StartedPostgreSqlContainer;

beforeAll(async () => {
	dbContainer = await new PostgreSqlContainer().start();

	process.env.DATABASE_URL = dbContainer.getConnectionUri();
	process.env.DEPLOYMENT_ENVIRONMENT = "test";

	const { db: drizzleDb, postgresClient } = setupDatabaseConnection(
		dbContainer.getConnectionUri(),
		"test",
		true,
	);

	db = drizzleDb;
	dbClient = postgresClient;

	await applyMigrations(db);
});

beforeEach(async (context) => {
	context.db = db;
	context.dbClient = dbClient;

	await truncateDb(context.db);
});

afterAll(async () => {
	await dbClient.end();
	await dbContainer.stop();
});
