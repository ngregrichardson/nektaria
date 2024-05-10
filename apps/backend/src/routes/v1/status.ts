import { factory } from "~/setup/factory";

const app = factory.createApp().get("/", (c) => {
	return c.json({});
});

export { app as statusRoutes };
