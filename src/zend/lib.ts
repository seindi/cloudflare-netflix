import php from "../zend/engine";
import __config from "../application/config.json";

php.lib = function () {}

php.lib.timeout = function (context: any, time: number = php.lib.timeout.dummy) { return setTimeout (context, time); }
php.lib.timeout.clear = function (timeout: any) { return clearTimeout (timeout); }
php.lib.timeout.dummy = 88;

php.promise = function (context: any) { return new Promise (function (resolve, reject) { context (function (value: any = true) { resolve (value); }, function (value: any = false) { reject (value); }); }); }

php.parse_url = function (input: string) {
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

php.is_agent_crawler = function (agent: string) {
	var pattern = [
		/Googlebot/i,
		/Bingbot/i,
		/Slurp/i,
		/DuckDuckBot/i,
		/Baiduspider/i,
		/YandexBot/i,
		/Facebot/i,
		/Twitterbot/i,
		/WhatsApp/i,
		/rogerbot/i,
		/DotBot/i,
		/SemrushBot/i,
		/Scrapy/i,
		];
	for (var crawler of pattern) {
		if (crawler.test (agent)) {
			return true;
			}
		}
	return false;
	}

php.render = function (markup: any, variable: any = {}, tab_s: number = 0) {
	if (Array.isArray (markup)) {
		if (tab_s) markup = markup.map (function (markup) {
			if (markup.startsWith (php.render.tag.open)) return markup;
			else return ("\t").repeat (tab_s) + markup;
			});
		markup = markup.join ("\n");
		}
	for (var key in variable) {
		var value = variable [key];
		if (Array.isArray (value)) value = value.join ("\n");
		markup = markup.split (php.render.tag (key)).join (value);
		}
	return markup;
	}

php.render.tag = function (key: string) {
	return php.render.tag.open + key + php.render.tag.close;
	}
php.render.tag.open = "{{ ";
php.render.tag.close = " }}";

php.markup = class {
	data: any = [];
	constructor (... data: any) {
		if (data.length) this.data = [... data];
		}
	push (tab: number, data: any) {
		if (tab) this.data.push (("\t").repeat (tab) + data);
		else this.data.push (data);
		return this;
		}
	value () {
		return this.data;
		}
	}

php.output = function (output: string) {
	var markup = new php.markup (`<!DOCTYPE html>`);
	markup.push (0, `<html lang="en" translate="no" class="notranslate" prefix="og: http://ogp.me/ns#">`);
	markup.push (1, `<head profile="#">`);
	markup.push (2, `<title>{{ title }}</title>`);
	markup.push (2, `<meta http-equiv="X-UA-Compatible" content="IE=edge">`);
	markup.push (2, `<meta http-equiv="X-Cross-Origin" content="*">`);
	markup.push (2, `<meta charset="UTF-8">`);
	markup.push (2, `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=1">`);
	markup.push (2, `<meta name="author" content="">`);
	markup.push (2, `<meta name="generator" content="">`);
	markup.push (2, `<meta name="keywords" content="{{ keyword }}">`);
	markup.push (2, `<meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large">`);
	markup.push (2, `<meta name="description" content="">`);
	markup.push (2, `<meta name="rating" content="general">`);
	markup.push (2, `<meta name="google" content="notranslate">`);
	markup.push (2, `<meta name="googlebot" content="notranslate">`);
	markup.push (2, `<meta name="googlebot-news" content="index, follow">`);
	markup.push (2, `<meta name="twitter:card" content="summary_large_image">`);
	markup.push (2, `<meta property="article:published_time" content="">`);
	markup.push (2, `<meta property="article:modified_time" content="">`);
	markup.push (2, `<meta property="og:site_name" content="{{ og:site-name }}">`);
	markup.push (2, `<meta property="og:title" content="{{ og:title }}">`);
	markup.push (2, `<meta property="og:description" content="{{ og:description }}">`);
	markup.push (2, `<meta property="og:url" content="{{ og:url }}">`);
	markup.push (2, `<meta property="og:image" content="">`);
	markup.push (2, `<meta property="og:type" content="{{ og:type }}">`);
	markup.push (2, `<meta property="og:locale" content="en_US"></meta>`);
	markup.push (2, `<link rel="profile" href="https://gmpg.org/xfn/11">`);
	markup.push (2, `<link rel="canonical" href="{{ canonical_url }}">`);
	markup.push (2, `<link rel="manifest" href="{{ asset_url }}/manifest.json">`);
	markup.push (2, `<link rel="alternate" href="{{ base_url }}/feed" type="application/rss+xml" title="&raquo; Feed">`);
	markup.push (2, `<link rel="alternate" href="{{ base_url }}/feed/atom" type="application/atom+xml" title="&raquo; Feed (Atom)">`);
	markup.push (2, `<link rel="search" href="{{ base_url }}/opensearch.xml" type="application/opensearchdescription+xml" title="">`);
	markup.push (2, `<link rel="search" href="{{ base_url }}/osd.xml" type="application/opensearchdescription+xml" title="">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://1.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://2.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://3.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://4.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://www.google-analytics.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://www.googletagmanager.com">`);
	markup.push (2, `<link rel="preconnect" href="https://www.blogger.com" crossorigin="anonymous">`);
	markup.push (2, `<link rel="preconnect" href="https://blogger.googleusercontent.com" crossorigin>`);
	markup.push (2, `<link rel="preconnect" href="https://resources.blogblog.com" crossorigin>`);
	markup.push (2, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`);
	markup.push (2, `<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>`);
	if (true) {
		if (__config ["deployment:live"]) {
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik+Puddles&display=swap">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Moirai+One&display=swap">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap">`);
			markup.push (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">`);
			markup.push (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">`);
			}
		markup.push (2, `<link rel="stylesheet" href="${php.base_uri ('{{ route style.css }}')}">`);
		markup.push (2, `<link rel="stylesheet" href="${php.theme_uri ('style.css')}">`);
		if (__config ["deployment:live"]) {
			markup.push (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>`);
			markup.push (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/lodash@4.17.21/core.min.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/vue@3.5.22/dist/vue.global.prod.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/vue-router@4.5.1/dist/vue-router.global.prod.js"></script>`);
			}
		markup.push (2, `<script src="${php.asset_uri ('/prototype.js')}"></script>`);
		markup.push (2, `<script src="${php.theme_uri ('script.js')}"></script>`);
		}
	markup.push (2, `<script type="application/ld+json"></script>`);
	markup.push (2, `<script type="application/ld+json"></script>`);
	markup.push (2, `<script type="text/javascript">var $__ = {"page:is": "{{ page:is }}", "route": ""}</script>`);
	markup.push (2, `<style>img:is([sizes="auto" i], [sizes^="auto," i]) { contain-intrinsic-size: 3000px 1500px }</style>`);
	markup.push (1, `</head>`);
	markup.push (1, `<body>`);
	markup.push (0, output);
	markup.push (1, `</body>`);
	markup.push (0, `</html>`);
	return markup.data.join ("\n");
	}

php.base_uri = function (path: string, version: string = "{{ theme_version }}") { if (version) path = path + "?version=" + version; return "{{ base_url }}" + path; }
php.asset_uri = function (path: string, version: string = "{{ theme_version }}") { if (version) path = path + "?version=" + version; return "{{ asset_url }}" + path; }
php.theme_uri = function (path: string, version: string = "{{ theme_version }}") { if (version) path = path + "?version=" + version; return "{{ theme_url }}/{{ theme_id }}/" + path; }