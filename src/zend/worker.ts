import php, {express} from "../zend/engine";
import __route from "../application/route.json";

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
	return {request: php.worker.io.request (io), response: php.worker.io.response (io)}
	}

php.worker.io.request = function (io: any) {
	var request : any = function () {}
	request.var = io.env;
	request.header = {}
	for (var header of io.req.raw.headers.entries ()) request.header [header [0]] = header [1];
	request.url = php.parse_url (io.req.raw.url);
	request.url.param = function (key: string) { return io.req.param (key); }
	request.visitor = {agent: request.header ["user-agent"], "agent:crawler": false, country: {code: io.req.raw.cf.country, region: {code: io.req.raw.cf.regionCode, name: io.req.raw.cf.region, city: {name: io.req.raw.cf.city, postal: {code: io.req.raw.cf.postalCode}}}}, latitude: io.req.raw.cf.latitude, longitude: io.req.raw.cf.longitude, internet: {organization: io.req.raw.cf.asOrganization}, timezone: io.req.raw.cf.timezone}
	return request;
	}

php.worker.io.response = function (io: any) {
	var response : any = function (value: string, code: number = 200) { return io.html (value, code); }
	response.text = io.text;
	response.html = io.html;
	response.json = io.json;
	return response;
	}

php.worker.route = (__route);
