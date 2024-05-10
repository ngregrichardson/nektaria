import invariant from "tiny-invariant";

type EnvResult<T> = {
	[K in keyof T]: T[K] extends true ? string : string | undefined;
};

export const validateEnvVariables = <T extends Record<string, boolean>>(
	config: T,
): EnvResult<T> => {
	const result: Partial<EnvResult<T>> = {};

	for (const key in config) {
		const value = process.env[key];
		if (config[key]) {
			invariant(value, `Missing required environment variable: ${key}`);
		}

		result[key] = value;
	}

	return result as EnvResult<T>;
};
