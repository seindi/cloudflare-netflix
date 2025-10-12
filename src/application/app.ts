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
import config from "../application/config.json"
import "../zend/lib"
// import "../zend/library"
import "../zend/constant"
// import "../zend/db"
import "../zend/theme"
// import "../zend/template"
// import "../zend/express"
import "../zend/worker"

import "../plugin/TMDB"

var {ln, ln_r} = php.constant
var {lib} = php

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

var library : any = async function (request: any, response: any, next: any) {
	request.base_url = request.url.address
	request.canonical_url = request.url.canonical
	request.output = {base_url: request.base_url, canonical_url: request.canonical_url}
	for (var i in php.worker.route) {
		if (i === "$") continue
		else if (typeof php.worker.route [i] === "string") request.output [["route", i].join (" ")] = php.worker.route [i]
		}
	if (php.is_agent_crawler (request.visitor.agent)) request.visitor ["agent:crawler"] = true
	request.organic = function () { return ! request.visitor ["agent:crawler"] }
	request.TMDB = new php.plugin.TMDB (request.var ["TMDB:api"], request)
	php.function.html.output.set ()
	return php.promise (function (resolve: any, reject: any) {
		lib.timeout (function () {
			request.config = config
			request.theme = new php.theme (request.config.theme)
			request.output.asset_url = request.base_url.trim ()
			request.output.theme_url = request.base_url + php.worker.route ["$"].theme_uri
			request.output.theme_id = request.config.theme.id
			request.output.theme_name = request.config.theme.name
			request.output.theme_version = request.config.theme.version
			request.output ["og:site-name"] = ""
			request.output ["og:title"] = "UnTitled"
			request.output ["og:description"] = ""
			request.output ["og:url"] = request.canonical_url
			request.output ["og:type"] = "website"
			resolve ()
			})
		});
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
	await library (request, response, next)
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
	request.output ["page:is"] = "index"
	var layout = request.theme.layout ("index").set ({}, 5)
	var body = request.theme.layout ("base").set ({body: layout}, 2)
	return response.output (body)
	/*
	var html = []
	if (request.organic ()) {
		var data = await request.TMDB.movie.popular ({page: 1})
		var video_card_single = []
		for (var i in data.list) {
			video_card_single.push (request.theme.component ("video-card").set ({poster: data.list [i].poster}))
			}
		var video_card = request.theme.component ("video-card:container").set ({body: video_card_single})
		html.push (video_card)
		}
	request.render.title = "asd"
	var layout = request.theme.layout ("index").set ({}, 6)
	var body = request.theme.layout ("base").set ({body: layout}, 2)
	return response.render (body)
	*/
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

app.get (php.worker.route.archive, function (request: any, response: any, next: any) {
	return response ("archive index")
	})

app.get (php.worker.route ["archive:year"], function (request: any, response: any, next: any) {
	return response ("archive year")
	})

app.get (php.worker.route ["archive:month"], function (request: any, response: any, next: any) {
	return response ("archive month")
	})

app.get (php.worker.route ["archive:day"], function (request: any, response: any, next: any) {
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

app.get (php.worker.route.movie, async function (request: any, response: any, next: any) {
	return response ("movie index")
	})

app.get (php.worker.route ["movie:watch"], async function (request: any, response: any, next: any) {
	return response ("movie watch")
	})

app.get (php.worker.route ["movie:discover"], async function (request: any, response: any, next: any) {
	return response ("movie discover")
	})

app.get (php.worker.route ["movie:trending"], async function (request: any, response: any, next: any) {
	var html = []
	if (request.organic ()) {
		var data = await request.TMDB.movie.trending ({page: request.url.query.get ("page")})
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

app.get (php.worker.route ["movie:popular"], async function (request: any, response: any, next: any) {
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
	})

app.get (php.worker.route ["movie:now_playing"], async function (request: any, response: any, next: any) {
	return response ("movie now_playing")
	})

app.get (php.worker.route ["movie:top_rated"], async function (request: any, response: any, next: any) {
	return response ("movie top_rated")
	})

app.get (php.worker.route ["movie:up_coming"], async function (request: any, response: any, next: any) {
	return response ("movie up_coming")
	})

app.get (php.worker.route ["movie:single"], async function (request: any, response: any, next: any) {
	return response ("movie single")
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
