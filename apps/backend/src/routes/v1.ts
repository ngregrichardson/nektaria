import { statusRoutes } from "./v1/status";
import { customerRoutes } from "./v1/customers";
import { factory } from "~/setup/factory";

const app = factory
	.createApp()
	.route("/status", statusRoutes)
	.route("/customers", customerRoutes);

export { app as v1Routes };
