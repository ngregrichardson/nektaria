import { withQuery } from "ufo";
import { validateEnvVariables } from "../utils/env";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

let postgresClient: Sql;
let db: PostgresJsDatabase<typeof schema>;
let preparedQueries: {
	getBag: null;
};

export const setupDatabaseConnection = (
	databaseUrl?: string,
	deploymentEnvironment?: string,
	force = false,
) => {
	// TODO remove dev dependency on non-SSL
	if (force || !db) {
		const { DATABASE_URL, DEPLOYMENT_ENVIRONMENT } = validateEnvVariables({
			DATABASE_URL: !databaseUrl,
			DEPLOYMENT_ENVIRONMENT: !deploymentEnvironment,
		});

		let dbUrl = databaseUrl;
		let deployEnv = deploymentEnvironment;

		if (!databaseUrl) {
			dbUrl = DATABASE_URL;
		}

		if (!deploymentEnvironment) {
			deployEnv = DEPLOYMENT_ENVIRONMENT;
		}

		const isProd = deployEnv === "prod";

		const connectionUrl = withQuery(dbUrl, {
			ssl: isProd || undefined,
		});

		postgresClient = postgres(connectionUrl, {
			onnotice: () => {},
			ssl: isProd
				? {
						rejectUnauthorized: false,
					}
				: false,
		});

		db = drizzle(postgresClient, {
			schema,
		});

		preparedQueries = {
			getBag: null,
		};
	}

	return { postgresClient, db, preparedQueries };
};

if (process.env.NODE_ENV !== "test") {
	setupDatabaseConnection();
}

export type DbContext = typeof db;

export const closeDbConnection = () => postgresClient?.end({ timeout: 20 });

export { postgresClient, db, preparedQueries };
