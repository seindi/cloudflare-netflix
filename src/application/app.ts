/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

import php from "../zend/engine"
import "../zend/lib"
// import "../zend/library"
// import "../zend/constant"
// import "../zend/db"
// import "../zend/theme"
// import "../zend/template"
// import "../zend/express"
import "../zend/worker"

import "../plugin/TMDB"

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

var library : any = function (request: any, response: any, next: any) {
	request.base_url = request.url.address
	request.canonical_url = request.url.canonical
	if (php.is_agent_crawler (request.visitor.agent)) request.visitor ["agent:crawler"] = true
	request.organic = function () { return ! request.visitor ["agent:crawler"] }
	request.TMDB = new php.plugin.TMDB (request.var ["TMDB:api"], request)
	php.function.html.output.set ()
	}

library.route = function () {}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

var app = new php.worker (php.express)
app.start (async function (request: any, response: any, next: any) {
	library (request, response, next)
	return next ()
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get ("/", async function (request: any, response: any, next: any) {
	var html = []
	if (request.organic ()) {
		var data = await request.TMDB.movie.popular ({page: 1})
		html.push ('<div style="display: flex">');
		for (var i in data.list) {
			html.push (`<div>
			<div>Title : ${data.list [i].title}</div>
			<div><img height="150" src="${data.list [i].poster}"></div>
			</div>`);
			}
		html.push ("</div>")
		}
	return response (php.html ["output"] (html.join ("")))
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (php.worker.route.page ["privacy"], function (request: any, response: any, next: any) {
	return response ("privacy")
	})

app.get (php.worker.route.page ["privacy-policy"], function (request: any, response: any, next: any) {
	return response ("privacy policy")
	})

app.get (php.worker.route.page ["privacy-policy:content"], function (request: any, response: any, next: any) {
	return response ("privacy policy content")
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (php.worker.route.archive.index, function (request: any, response: any, next: any) {
	return response ("archive index")
	})

app.get (php.worker.route.archive.year, function (request: any, response: any, next: any) {
	return response ("archive year")
	})

app.get (php.worker.route.archive.month, function (request: any, response: any, next: any) {
	return response ("archive month")
	})

app.get (php.worker.route.archive.day, function (request: any, response: any, next: any) {
	return response ("archive day")
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

library.route.popular = async function popular_list (request: any, response: any, next: any) {
	var html = []
	if (request.organic ()) {
		var data = await request.TMDB.movie.popular ({page: request.url.query.get ("page")})
		html.push ('<div style="display: flex">');
		for (var i in data.list) {
			html.push (`<div>
			<div>Title : ${data.list [i].title}</div>
			<div><img height="150" src="${data.list [i].poster}"></div>
			</div>`);
			}
		html.push ("</div>")
		}
	return response (php.html ["output"] (html.join ("")))
	}

app.get (php.worker.route ["__"].popular, library.route.popular)
app.get (php.worker.route ["__"]["popular:list"], library.route.popular)

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (php.worker.route.movie.path, async function (request: any, response: any, next: any) {
	return next ()
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (php.worker.route.path, function (request: any, response: any, next: any) {
	console.log ("path : ", request.url.path)
	console.log ("path : ", request.url.param ("path"))
	return next ()
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.catch (function (request: any, response: any, next: any) {
	return response ("not found", 404)
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

export default app.export ()

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */
