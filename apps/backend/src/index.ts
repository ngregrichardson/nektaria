import { csrf } from "hono/csrf";
import { swaggerUI } from "@hono/swagger-ui";
import { v1Routes } from "~/routes/v1";
import { factory } from "./setup/factory";

const app = factory.createApp();

app.use(csrf());

app.get("/docs", swaggerUI({ url: "/doc" }));

const routes = app.route("/v1", v1Routes);

export default app;

export { routes };
