import php from "../zend/engine";
import __config from "../config.json";
import __theme from "../db/theme.json";

php.theme = class {
	id: string;
	version: string;
	prefix: string;
	__layout: any = {}
	__component: any = {}
	constructor (theme: any, prefix: string) {
		this.id = theme.id;
		this.version = theme.version;
		this.prefix = prefix;
		}
	layout (id: string) { return new php.theme.layout (this, id); }
	component (id: string) { return new php.theme.component (this, id); }
	async fetch () {
		var theme : any = await this.__fetch ();
		for (var i in theme.layout) this.__layout [i] = theme.layout [i].ln;
		for (var i in theme.component) this.__component [i] = theme.component [i].ln;
		return new Promise (function (resolve, reject) { resolve (true); });
		}
	__fetch () {
		var prefix = this.prefix;
		var theme_id = this.id;
		var theme_version = this.version;
		return new Promise (async function (resolve, reject) {
			var id : string = "";
			var layout : any = await fetch ([prefix, theme_id, theme_version, "layout"].join ("/"));
			layout = await layout.text ();
			layout = layout.split ("\n");
			var __layout : any = {}
			for (var i in layout) {
				if (layout [i]) {
					if (layout [i].startsWith (`<template id`)) {
						id = str_before (`"`, str_after (`<template id="`, layout [i]))
						__layout [id] = {ln: []}
						continue;
						}
					else if (layout [i] === `</template>`) continue;
					else __layout [id].ln.push (layout [i]);
					}
				}
			var component : any = await fetch ([prefix, theme_id, theme_version, "component"].join ("/"));
			component = await component.text ();
			component = component.split ("\n");
			var __component : any = {}
			for (var i in component) {
				if (component [i].startsWith (`<template id`)) {
					id = str_before (`"`, str_after (`<template id="`, component [i]))
					__component [id] = {ln: []}
					continue;
					}
				else if (component [i] === `</template>`) continue;
				else if (__component [id]) __component [id].ln.push (component [i]);
				}
			resolve ({layout: __layout, component: __component});
			});
		}
	}

php.theme.layout = class {
	theme: any;
	id: string;
	constructor (theme: any, id: string) {
		this.theme = theme;
		this.id = id;
		}
	set (variable: any = {}, tab: number = 0) {
		var markup = this.theme.__layout [this.id];
		if (markup) return php.render (markup, variable, tab);
		else return "";
		}
	}

php.theme.component = class {
	theme: any;
	id: string;
	constructor (theme: any, id: string) {
		this.theme = theme;
		this.id = id;
		}
	set (variable: any = {}, tab: number = 0) {
		var markup = this.theme.__component [this.id];
		if (markup) return php.render (markup, variable, tab);
		else return "";
		}
	}

function str_after (search: string, input: string) {
	var pos = input.indexOf (search);
	if (pos !== undefined) return input.substr (pos + search.length);
	else return "";
	}

function str_before (search: string, input: string) {
	return input.split (search) [0];
	}