function Define ($, key, value, option = {}) { Object.defineProperty ($, key, {enumerable: (option.enumerable || false), configurable: (option.configurable || false), writable: (option.writable || false), value}); }
Define.property = function ($, key, value, option) { Define ($.prototype, key, value, option); }

Object.type = function (input) { return typeof input; }
Object.type.array = function (input) { if (arguments.length) return input instanceof Array; else return Array; }
Object.type.boolean = function (input) { if (arguments.length) return input instanceof Boolean || typeof input === "boolean"; else return Boolean; }
Object.type.date = function (input) { if (arguments.length) return input instanceof Date; else return Date; }
Object.type.error = function (input) { if (arguments.length) return input instanceof Error; else return Error; }
Object.type.function = function (input) { if (arguments.length) return input instanceof Function || typeof input === "function"; else return Function; }
Object.type.number = function (input) { if (arguments.length) return input instanceof Number || typeof input === "number"; else return Number; }
Object.type.object = function (input) { if (arguments.length) return input instanceof Object || typeof input === "object"; else return Object; }
Object.type.regex = function (input) { if (arguments.length) return input instanceof RegExp; else return RegExp; }
Object.type.promise = function (input) { if (arguments.length) return input instanceof Promise; else return Promise; }
Object.type.string = function (input) { if (arguments.length) return input instanceof String || typeof input === "string"; else return String; }
Object.type.to_origin = function (input) { if (input === "undefined") return undefined; else if (input === "null") return null; else return input; }

Object.type_of = function (input) { return Object.prototype.toString.call (input); }
Object.type_of.array = function (input) { if (arguments.length) return Object.type_of (input) === "[object Array]"; else return "[object Array]"; }
Object.type_of.boolean = function (input) { if (arguments.length) return Object.type_of (input) === "[object Boolean]"; else return "[object Boolean]"; }
Object.type_of.date = function (input) { if (arguments.length) return Object.type_of (input) === "[object Date]"; else return "[object Date]"; }
Object.type_of.function = function (input) { if (arguments.length) return Object.type_of (input) === "[object Function]"; else return "[object Function]"; }
Object.type_of.null = function (input) { if (arguments.length) return Object.type_of (input) === "[object Null]"; else return "[object Null]"; }
Object.type_of.number = function (input) { if (arguments.length) return Object.type_of (input) === "[object Number]"; else return "[object Number]"; }
Object.type_of.object = function (input) { if (arguments.length) return Object.type_of (input) === "[object Object]"; else return "[object Object]"; }
Object.type_of.regex = function (input) { if (arguments.length) return Object.type_of (input) === "[object RegExp]"; else return "[object RegExp]"; }
Object.type_of.string = function (input) { if (arguments.length) return Object.type_of (input) === "[object String]"; else return "[object String]"; }

Object.is_boolean = Object.type_of.boolean;
Object.is_object = Object.type_of.object;
Object.is_array = Array.isArray;
Object.is_string = Object.type_of.string;
Object.is_number = Object.type_of.number;
Object.is_nan = Number.isNaN;
Object.is_integer = Number.isInteger;
Object.is_finite = Number.isFinite;
Object.is_float = function (input) { if (Object.type_of.number (input)) return input.toString ().split (Number.float.separator).length === 2; else return false; }
Object.is_function = Object.type_of.function;
Object.is_date = Object.type_of.date;
Object.is_regex = Object.type_of.regex;
Object.is_url = function (... input) { return URL.isURL (... input); }
Object.is_define = function (input) { return ! Object.un_define (input); }
Object.is_null = function (input) { return input === null || Object.type_of.null (input); }
Object.is_set = function (input) { return ! (Object.un_define (input) || Object.is_null (input)); }
Object.is_not = function (input) { return ! input; }
Object.un_define = function (input) { if (arguments.length) return input === undefined; else return undefined; }
Object.to_string = function (input) { if (Object.is_set (input)) return input.toString (); else return ""; }
Object.to_number = function (input) { if (Object.is_set (input)) return Number (input); else return 0; }

Define (Object, "length", function (object) { var length = 0; for (var i in object) length ++; return length; });
Define (Object, "concat", function (object, data) { var concat = Object.clone (object); for (var i in data) concat [i] = data [i]; return concat; });
Define (Object, "clone", function (object) { return JSON.parse (JSON.stringify (object)); });

Array.define = function (key, value, option) { Object.defineProperty (Array.prototype, key, {value, ... option}); }
Array.define ("clone", function () { return Object.clone (this); });
Array.define ("flip", function () { var array = this.clone (); array.reverse (); return array; });
Array.define ("chunk", function (chunk) { return _.chunk (this, chunk); });
Array.define ("insert", function () { return this; });
Array.define ("update", function (index, data, length) { var array = this.clone (); array.splice (index, (length || 1), data); return array; });
Array.define ("delete", function (index, length) { if (typeof index === "object") return this.filter (function (data) { return ! index (data); }); else { var array = this.clone (); array.splice (index, (length || 1)); return array; } });
Array.define ("without", function (... array) { return _.without (this, ... array); });
Array.define ("order", function (key, sort) { if (sort === "ascending") sort = "asc"; if (sort === "descending") sort = "desc"; return _.orderBy (this, key, sort); });
Array.define ("pushed", function (tab, data) { return this.push (("\t").repeat (tab) + data); });
Array.define ("xxx", function () { return this; });

String.define = function (key, value, option) { Object.defineProperty (String.prototype, key, {value, ... option}); }
String.define ("to_format", function (key, value) { return this.split (key).join (value); });
String.define ("xxx", function () {});

Number.define = function (key, value, option) { Object.defineProperty (Number.prototype, key, {value, ... option}); }
Number.define ("format", function () {});
Number.define ("xxx", function () { return this; });

Date.define = function (key, value, option) { Object.defineProperty (Date.prototype, key, {value, ... option}); }
Date.define ("xxx", function () {});

URL.isURL = function (url, protocol = ["http://", "https://"]) { if (url) if (typeof url === "string") for (var i in protocol) if (url.startsWith (protocol [i])) return true; return false; }
URL.parse_url = function (input) {
	var url = new URL (input);
	return {
		address: url.origin,
		canonical: url.href,
		host: {name: url.hostname, address: url.host},
		domain: {},
		protocol: url.protocol.substr (0, (url.protocol.length - 1)),
		path: url.pathname,
		query: url.searchParams,
		parse: url,
		}
	}

Function.html = function () {}
Function.html.output = function (body) {
	var html = [`<!DOCTYPE html>`];
	html.push (`<html lang="en" translate="no" class="notranslate" prefix="og: http://ogp.me/ns#">`);
	html.push (("\t") + `<head profile="#">`);
	html.push (("\t").repeat (2) + `<title></title>`);
	html.push (("\t").repeat (2) + `<meta http-equiv="X-UA-Compatible" content="IE=edge">`);
	html.push (("\t").repeat (2) + `<meta http-equiv="X-Cross-Origin" content="*">`);
	html.push (("\t").repeat (2) + `<meta charset="UTF-8">`);
	html.push (("\t").repeat (2) + `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=1">`);
	html.push (("\t").repeat (2) + `<meta name="author" content="">`);
	html.push (("\t").repeat (2) + `<meta name="generator" content="">`);
	html.push (("\t").repeat (2) + `<meta name="keywords" content="">`);
	html.push (("\t").repeat (2) + `<meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large">`);
	html.push (("\t").repeat (2) + `<meta name="description" content="">`);
	html.push (("\t").repeat (2) + `<meta name="google" content="notranslate">`);
	html.push (("\t").repeat (2) + `<meta name="googlebot" content="notranslate">`);
	html.push (("\t").repeat (2) + `<meta name="googlebot-news" content="index, follow">`);
	html.push (("\t").repeat (2) + `<meta name="twitter:card" content="summary_large_image">`);
	html.push (("\t").repeat (2) + `<meta property="article:published_time" content="">`);
	html.push (("\t").repeat (2) + `<meta property="article:modified_time" content="">`);
	html.push (("\t").repeat (2) + `<meta property="og:site_name" content="">`);
	html.push (("\t").repeat (2) + `<meta property="og:title" content="">`);
	html.push (("\t").repeat (2) + `<meta property="og:description" content="">`);
	html.push (("\t").repeat (2) + `<meta property="og:url" content="">`);
	html.push (("\t").repeat (2) + `<meta property="og:image" content="">`);
	html.push (("\t").repeat (2) + `<meta property="og:type" content="website">`);
	html.push (("\t").repeat (2) + `<meta property="og:locale" content="en_US"></meta>`);
	html.pushed (2, `<link rel="profile" href="https://gmpg.org/xfn/11">`);
	html.pushed (2, `<link rel="canonical" href="">`);
	html.pushed (2, `<link rel="manifest" href="/manifest.json">`);
	html.pushed (2, `<link rel="alternate" href="/feed" type="application/rss+xml" title="&raquo; Feed">`);
	html.pushed (2, `<link rel="alternate" href="/feed/atom" type="application/atom+xml" title="&raquo; Feed (Atom)">`);
	html.pushed (2, `<link rel="search" href="/opensearch.xml" type="application/opensearchdescription+xml" title="">`);
	html.pushed (2, `<link rel="search" href="/osd.xml" type="application/opensearchdescription+xml" title="">`);
	html.pushed (2, `<link rel="dns-prefetch" href="https://1.bp.blogspot.com">`);
	html.pushed (2, `<link rel="dns-prefetch" href="https://2.bp.blogspot.com">`);
	html.pushed (2, `<link rel="dns-prefetch" href="https://3.bp.blogspot.com">`);
	html.pushed (2, `<link rel="dns-prefetch" href="https://4.bp.blogspot.com">`);
	html.pushed (2, `<link rel="dns-prefetch" href="https://www.google-analytics.com">`);
	html.pushed (2, `<link rel="dns-prefetch" href="https://www.googletagmanager.com">`);
	html.pushed (2, `<link rel="preconnect" href="https://www.blogger.com" crossorigin="anonymous">`);
	html.pushed (2, `<link rel="preconnect" href="https://blogger.googleusercontent.com" crossorigin>`);
	html.pushed (2, `<link rel="preconnect" href="https://resources.blogblog.com" crossorigin>`);
	html.pushed (2, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`);
	html.pushed (2, `<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin></link>`);
	if (true) {
		html.pushed (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
		html.pushed (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
		html.pushed (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
		html.pushed (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">`);
		html.pushed (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik+Puddles&display=swap">`);
		html.pushed (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Moirai+One&display=swap">`);
		html.pushed (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap">`);
		html.pushed (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">`);
		html.pushed (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">`);
		html.pushed (2, `<link rel="stylesheet" href="/style.css">`);
		html.pushed (2, `<link rel="stylesheet" href="/theme/default/style.css">`);
		html.pushed (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>`);
		html.pushed (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>`);
		html.pushed (2, `<script src="https://unpkg.com/lodash@4.17.21/core.min.js"></script>`);
		html.pushed (2, `<script src="https://unpkg.com/vue@3.5.22/dist/vue.global.prod.js"></script>`);
		html.pushed (2, `<script src="https://unpkg.com/vue-router@4.5.1/dist/vue-router.global.prod.js"></script>`);
		html.pushed (2, `<script src="/theme/default/prototype.js"></script>`);
		}
	html.push (("\t") + `</head>`);
	html.push (("\t") + `<body>`);
	html.push (body);
	html.push (("\t") + `</body>`);
	html.push (`</html>`);
	return html.join ("\n");
	}

Function.JQuery = function () {
	$.body = function () {}
	$.body.css = function () {
		var type = "phone";
		var orientation = "portrait";
		var body = $ ("body").innerWidth ();
		if (body > 600) type = "phone";
		if (body > 1000) type = "computer";
		if ($ ("body").width () > $ ("body").height ()) orientation = "landscape";
		$ ("body").removeClass ("computer mobile tablet phone");
		$ ("body").addClass (type).addClass (orientation);
		}
	}

var $$$ = {
	object: Object,
	array: Array,
	string: String,
	number: Number,
	url: URL,
	}

//