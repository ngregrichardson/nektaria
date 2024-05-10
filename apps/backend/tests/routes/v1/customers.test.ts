import { expect } from "vitest";
import { apiTest } from "../../utils/tests";

apiTest("GET /v1/customers", async ({ api }) => {
	const response = await api.request("/v1/status");
	const body = await response.json();

	expect(response.status).toBe(200);
	expect(body).toEqual({});
});
