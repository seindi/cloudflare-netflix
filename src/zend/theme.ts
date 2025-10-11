import php from "../zend/engine";

import theme_default from "../theme/default";

var THEME : any = {
	"default": theme_default,
	}

php.theme = class {
	id: string;
	name: string;
	version: string;
	constructor (theme: any) {
		this.id = theme.id;
		this.name = theme.name;
		this.version = theme.version;
		}
	layout (id: any) { return new php.theme.layout (this, id); }
	component (id: any) { return new php.theme.component (this, id); }
	}

php.theme.layout = class {
	theme: any;
	id: string;
	constructor (theme: any, id: string) {
		this.theme = theme;
		this.id = id;
		}
	set (variable: any = {}, tab_s: number = 0) {
		var markup = THEME [this.theme.id].layout [this.id];
		if (markup) return php.render (markup, variable, tab_s);
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
	set (variable: any = {}, tab_s: number = 0) {
		var markup = THEME [this.theme.id].component [this.id];
		if (markup) return php.render (markup, variable, tab_s);
		else return "";
		}
	}

php.theme.variable = function (variable: string) {
	return "{{ " + variable + " }}"
	}

/*
import php from "../zend/engine";

import theme_default_layout from "../theme/default/layout";
import theme_default_component_video_card from "../theme/default/component/video-card";

var THEME : any = {
	"default layout": theme_default_layout,
	"default component video-card": theme_default_component_video_card,
	}

function get_theme_layout (theme: string, layout: string) {
	if (layout) return THEME [theme + " layout " + layout];
	else return THEME [theme + " layout"];
	}

function get_theme_component (theme: string, component: string) {
	return THEME [theme + " component " + component];
	}

php.theme = class {
	id: string;
	name: string;
	version: string;
	constructor (theme: any) {
		this.id = theme.id;
		this.name = theme.name;
		this.version = theme.version;
		}
	layout (layout: string) {
		return get_theme_layout (this.id, layout);
		}
	component (component: string) {
		return get_theme_component (this.id, component);
		}
	}


*/