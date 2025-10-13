import php, {express} from "../zend/engine";
import __config from "../config.json";
import __theme from "../db/theme.json";
import __app from "../application/app.json";
import $__route from "../application/route.json";
const __route : any = $__route;

php.worker = class {
	app: express;
	route: any;
	constructor (app: express, context: any) {
		this.app = app;
		if (context) this.start (context);
		}
	start (context: any) {
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				var {request, response} = php.worker.io (io);
				worker.request = request;
				worker.response = response;
				if (context) return context (worker.request, worker.response, next);
				else return next ();
				}
			}
		this.app.use ("*", _ (this));
		}
	use (path: string, context: any) {
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				if (context) return context (worker.request, worker.response, next);
				else return next ();
				}
			}
		this.app.use (path, _ (this));
		}
	get (path: string, context: any) {
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				if (context) return context (worker.request, worker.response, next);
				else return next ();
				}
			}
		this.app.get (path, _ (this));
		}
	post (path: string, context: any) {
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				if (context) return context (worker.request, worker.response, next);
				else return next ();
				}
			}
		this.app.post (path, _ (this));
		}
	catch (context: any) {
		this.use ("*", context);
		}
	export () {
		return this.app;
		}
	}

php.worker.io = function (io: any) {
	var request = php.worker.io.request (io);
	return {request, response: php.worker.io.response (io, request)}
	}

php.worker.io.request = function (io: any) {
	var request : any = function () {}
	request.var = io.env;
	request.error = {}
	request.render = {}
	request.header = {}
	for (var header of io.req.raw.headers.entries ()) request.header [header [0]] = header [1];
	request.url = php.parse_url (io.req.raw.url);
	request.url.param = function (key: string) { return io.req.param (key); }
	request.app = {host: request.url.host.name}
	request.base_url = request.url.address
	request.canonical_url = request.url.canonical
	request.visitor = {agent: request.header ["user-agent"], "agent:crawler": false, country: {code: io.req.raw.cf.country, region: {code: io.req.raw.cf.regionCode, name: io.req.raw.cf.region, city: {name: io.req.raw.cf.city, postal: {code: io.req.raw.cf.postalCode}}}}, latitude: io.req.raw.cf.latitude, longitude: io.req.raw.cf.longitude, internet: {organization: io.req.raw.cf.asOrganization}, timezone: io.req.raw.cf.timezone}
	if (php.is_agent_crawler (request.visitor.agent)) request.visitor ["agent:crawler"] = true;
	request.organic = function () { return ! request.visitor ["agent:crawler"]; }
	request.output = {route: [], base_url: request.base_url, canonical_url: request.canonical_url, theme_id: "default", theme_version: "0.0.0", theme_version_check: "0.0.0"}
	for (var i in __route) {
		if (i === "$") continue;
		else if (typeof __route [i] === "string") {
			request.output.route.push (`"${i}": "${__route [i]}"`)
			request.output [["route", i].join (" ")] = __route [i];
			}
		}
	request.output.route = request.output.route.join (", ");
	return request;
	}

php.worker.io.response = function (io: any, request: any) {
	var response : any = function (value: string, code: number = 200) { return io.html (value, code); }
	response.text = io.text;
	response.html = io.html;
	response.json = io.json;
	response.output = function (output: string) { return response (php.render (php.output (output), request.output)); }
	return response;
	}