import "../prototype.js";
import {Hono} from "hono";
function plugin () {}
var php : any = {
	express: new Hono <{Bindings: {asset: Fetcher, db: D1Database, cache: KVNamespace}}> (),
	plugin,
	object: Object,
	function: Function,
	is_boolean: Object.is_boolean,
	is_object: Object.is_object,
	is_array: Object.is_array,
	is_string: Object.is_string,
	is_number: Object.is_number,
	is_nan: Object.is_nan,
	is_integer: Object.is_integer,
	is_finite: Object.is_finite,
	is_float: Object.is_float,
	is_function: Object.is_function,
	is_date: Object.is_date,
	is_regex: Object.is_regex,
	is_url: Object.is_url,
	is_define: Object.is_define,
	is_null: Object.is_null,
	is_set: Object.is_set,
	is_not: Object.is_not,
	un_define: Object.un_define,
	to_string: Object.to_string,
	to_number: Object.to_number,
	parse_url: URL.parse_url,
	html: Function.html,
	}
export type {Hono as express}
export default php;
