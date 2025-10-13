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

import __config from "../config.json"
let $__config : any = __config

import __theme from "../db/theme.json"
let $__theme : any = {}
for (var i in __theme) $__theme [__theme [i].id] = __theme [i]

import __app from "../application/app.json"
let $__app : any = __app

import __route from "../application/route.json"
let $__route : any = __route

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

var app = new php.worker (php.express)
app.start (async function (request: any, response: any, next: any) {
	await libraries (request, response, next)
	if (request.error ["found"] === "host") return response ("host not found", 404)
	else return next ()
	})

async function libraries (request: any, response: any, next: any) {
	//var fetcher = await fetch ("http://127.0.0.1/theme/default/layout.html")
	//console.log (await fetcher.text ())
	if (request.app.host in __app) {
		request.app.theme = {id: $__app [request.app.host].theme.id}
		if ($__app [request.app.host].theme.version) {}
		else request.app.theme.version = $__theme [request.app.theme.id].version.last ()
		request.TMDB = new php.plugin.TMDB (__config ["TMDB:api"], request)
		request.library = new library (request, response, next)
		return php.promise (function (resolve: any, reject: any) {
			var then : any = function () {
				then.queue.push (true)
				if (then.queue.length > 1) resolve ()
				}
			then.queue = []
			lib.timeout (async function () {
				request.config = (__config)
				request.library.output ()
				request.library.seo ()
				request.theme = new php.theme (request.app.theme, request.output.theme_url)
				await request.theme.fetch ()
				resolve ()
				})
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
	var body = request.theme.layout ["base"].join ("\n")
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

app.get ($__route.page ["privacy"], function (request: any, response: any, next: any) {
	return response ("privacy")
	})

app.get ($__route.page ["privacy-policy"], function (request: any, response: any, next: any) {
	return response ("privacy policy")
	})

app.get ($__route.page ["privacy-policy:content"], function (request: any, response: any, next: any) {
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

app.get ($__route.archive, function (request: any, response: any, next: any) {
	return response ("archive index")
	})

app.get ($__route ["archive:year"], function (request: any, response: any, next: any) {
	return response ("archive year")
	})

app.get ($__route ["archive:month"], function (request: any, response: any, next: any) {
	return response ("archive month")
	})

app.get ($__route ["archive:day"], function (request: any, response: any, next: any) {
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

app.get ($__route.movie, async function (request: any, response: any, next: any) {
	return response ("movie index")
	})

app.get ($__route ["movie:watch"], async function (request: any, response: any, next: any) {
	return response ("movie watch")
	})

app.get ($__route ["movie:discover"], async function (request: any, response: any, next: any) {
	return response ("movie discover")
	})

app.get ($__route ["movie:popular"], async function (request: any, response: any, next: any) {
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

app.get ($__route ["movie:now_playing"], async function (request: any, response: any, next: any) {
	return response ("movie now_playing")
	})

app.get ($__route ["movie:top_rated"], async function (request: any, response: any, next: any) {
	return response ("movie top_rated")
	})

app.get ($__route ["movie:up_coming"], async function (request: any, response: any, next: any) {
	return response ("movie up_coming")
	})

app.get ($__route ["movie:single"], async function (request: any, response: any, next: any) {
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

app.get ($__route.movie.path, async function (request: any, response: any, next: any) {
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

app.get ($__route.path, function (request: any, response: any, next: any) {
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
		}
	async output () {
		if  (__config.deployment === "local") {
			this.request.output.asset_url = this.request.base_url + $__route ["$"].asset_uri
			this.request.output.static_url = this.request.base_url + $__route ["$"].static_uri
			this.request.output.theme_url = this.request.base_url + $__route ["$"].theme_uri
			}
		if  (__config.deployment === "live") {
			this.request.output.asset_url = __config ["asset:url"] + $__route ["$"].asset_uri
			this.request.output.static_url = __config ["static:url"] + $__route ["$"].static_uri
			this.request.output.theme_url = __config ["theme:url"] + $__route ["$"].theme_uri
			}
		this.request.output.theme_id = this.request.config.theme.id
		this.request.output.theme_name = this.request.config.theme.name
		this.request.output.theme_version = this.request.config.theme.version
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