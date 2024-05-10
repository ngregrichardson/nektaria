import type { Nektaria } from "@nektaria/shared";
import { hc } from "hono/client";

const client = hc<Nektaria>("http://localhost:3000");

console.log(await client.v1);
