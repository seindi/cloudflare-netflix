import "../prototype.js";
import {Hono} from "hono";
function plugin () {}
var php : any = {
	express: new Hono <{Bindings: {asset: Fetcher, db: D1Database, cache: KVNamespace}}> (),
	plugin,
	}
export type {Hono as express}
export default php;
