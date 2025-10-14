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

import php, {express} from "../zend/engine"
import "../zend/lib"
// import "../zend/library"
import "../zend/constant"
// import "../zend/db"
import "../zend/theme"
// import "../zend/template"
// import "../zend/express"
import "../zend/worker"

import "../plugin/TMDB"

import configuration from "../config.json"
let conf : any = configuration

import _theme from "../db/theme.json"
let $__theme : any = {}
for (var i in _theme) $__theme [_theme [i].id] = _theme [i]

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

var app = new php.worker (php.express)
app.start (async function (request: any, response: any, next: any) {
	await libraries (request, response, next)
	if (request.error ["found"] === "host") return response (php.error.HOST_NOT_FOUND, php.error.found)
	if (request.error ["forbidden"] === "agent") return response (php.error.VISITOR_AGENT, php.error.forbidden)
	else return next ()
	})

async function libraries (request: any, response: any, next: any) {
	if (request.app.host in app.list) {
		if (request.organic ()) {
			if (request.app.theme = {id: app.list [request.app.host].theme.id})
			if (app.list [request.app.host].theme.version) {} else request.app.theme.version = $__theme [request.app.theme.id].version.last ()
			if (request.library = new library (request, response, next)) return php.promise (function (resolve: any, reject: any) {
				var then : any = function () {
					then.queue.push (true)
					if (then.queue.length > 1) resolve ()
					}
				then.queue = []
				lib.timeout (async function () {
					request.config = (conf)
					request.library.output ()
					request.library.seo ()
					request.theme = new php.theme (request.app.theme, request.output.theme_url)
					await request.theme.fetch ()
					resolve ()
					})
				})
			}
		else return php.promise (function (resolve: any, reject: any) {
			request.error ["forbidden"] = "agent"
			resolve ()
			})
		}
	else return php.promise (function (resolve: any, reject: any) {
		request.error ["found"] = "host"
		resolve ()
		})
	}

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
	// var layout = request.theme.layout ("index").set ({}, 5)
	// var body = request.theme.layout ("base").set ({body: layout}, 2)
	var body = request.theme.layout ("base").set ({body: "Hello World"}, 2)
	return response.output (body)
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

app.get (app.route.page ["privacy"], function (request: any, response: any, next: any) {
	return response ("privacy")
	})

app.get (app.route.page ["privacy-policy"], function (request: any, response: any, next: any) {
	return response ("privacy policy")
	})

app.get (app.route.page ["privacy-policy:content"], function (request: any, response: any, next: any) {
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

app.get (app.route.archive, function (request: any, response: any, next: any) {
	return response ("archive index")
	})

app.get (app.route ["archive:year"], function (request: any, response: any, next: any) {
	return response ("archive year")
	})

app.get (app.route ["archive:month"], function (request: any, response: any, next: any) {
	return response ("archive month")
	})

app.get (app.route ["archive:day"], function (request: any, response: any, next: any) {
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

app.get (app.route.movie, async function (request: any, response: any, next: any) {
	return response ("movie index")
	})

app.get (app.route ["movie:watch"], async function (request: any, response: any, next: any) {
	return response ("movie watch")
	})

app.get (app.route ["movie:discover"], async function (request: any, response: any, next: any) {
	return response ("movie discover")
	})

app.get (app.route ["movie:popular"], async function (request: any, response: any, next: any) {
	var html = []
	if (request.organic ()) {
		var data = await request.TMDB.movie.popular ({page: request.url.query.get ("page")})
		html.push ('<div style="display: flex">')
		for (var i in data.list) {
			html.push (`<div>
			<div>Title : ${data.list [i].title}</div>
			<div><img height="150" src="${data.list [i].poster}"></div>
			</div>`)
			}
		html.push ("</div>")
		}
	return response (php.html ["output"] (html.join ("")))
	})

app.get (app.route ["movie:now_playing"], async function (request: any, response: any, next: any) {
	return response ("movie now_playing")
	})

app.get (app.route ["movie:top_rated"], async function (request: any, response: any, next: any) {
	return response ("movie top_rated")
	})

app.get (app.route ["movie:up_coming"], async function (request: any, response: any, next: any) {
	return response ("movie up_coming")
	})

app.get (app.route ["movie:single"], async function (request: any, response: any, next: any) {
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

app.get (app.route.movie.path, async function (request: any, response: any, next: any) {
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

app.get (app.route.path, function (request: any, response: any, next: any) {
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

var library : any = class {
	request: any
	response: any
	next: any
	constructor (request: any, response: any, next: any) {
		this.request = request
		this.response = response
		this.next = next
		this.plugin ()
		}
	plugin () {
		this.request.TMDB = new php.plugin.TMDB (conf ["TMDB:api"], this.request)
		}
	async output () {
		if  (conf.deployment === "local") {
			this.request.output.asset_url = this.request.base_url + app.route ["$"].asset_uri
			this.request.output.static_url = this.request.base_url + app.route ["$"].static_uri
			this.request.output.theme_url = this.request.base_url + app.route ["$"].theme_uri
			}
		if  (conf.deployment === "live") {
			this.request.output.asset_url = conf ["asset:url"] + app.route ["$"].asset_uri
			this.request.output.static_url = conf ["static:url"] + app.route ["$"].static_uri
			this.request.output.theme_url = conf ["theme:url"] + app.route ["$"].theme_uri
			}
		this.request.output.latest = conf.latest
		this.request.output.theme_id = this.request.app.theme.id
		}
	async seo () {
		this.request.output ["og:site-name"] = ""
		this.request.output ["og:title"] = "UnTitled"
		this.request.output ["og:description"] = ""
		this.request.output ["og:url"] = this.request.canonical_url
		this.request.output ["og:type"] = "website"
		}
	}

library.route = function () {}
library.route.popular = async function popular_list (request: any, response: any, next: any) {
   var html = []
   if (request.organic ()) {
	   var data = await request.TMDB.movie.popular ({page: request.url.query.get ("page")})
	   html.push ('<div style="display: flex">')
	   for (var i in data.list) {
		   html.push (`<div>
		   <div>Title : ${data.list [i].title}</div>
		   <div><img height="150" src="${data.list [i].poster}"></div>
		   </div>`)
		   }
	   html.push ("</div>")
	   }
   return response (php.html ["output"] (html.join ("")))
   }

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