Object.toClone = function (input) { return JSON.parse (JSON.stringify (input)); }
Object.is_url = function (input) { return URL.isURL (input); }

Array.define = function (key, value, option) { Object.defineProperty (Array.prototype, key, {value, ... option}); }
Array.define ("clone", function () { return Object.toClone (this); });
Array.define ("flip", function () { var array = this.clone (); array.reverse (); return array; });
Array.define ("chunk", function (chunk) { return _.chunk (this, chunk); });
Array.define ("insert", function () { return this; });
Array.define ("update", function (index, data, length) { var array = this.clone (); array.splice (index, (length || 1), data); return array; });
Array.define ("delete", function (index, length) { if (typeof index === "object") return this.filter (function (data) { return ! index (data); }); else { var array = this.clone (); array.splice (index, (length || 1)); return array; } });
Array.define ("without", function (... array) { return _.without (this, ... array); });
Array.define ("order", function (key, sort) { if (sort === "ascending") sort = "asc"; if (sort === "descending") sort = "desc"; return _.orderBy (this, key, sort); });
Array.define ("xxx", function () { return this; });

String.define = function (key, value, option) { Object.defineProperty (String.prototype, key, {value, ... option}); }
String.define ("xxx", function () {});

Number.define = function (key, value, option) { Object.defineProperty (Number.prototype, key, {value, ... option}); }
Number.define ("format", function () {});
Number.define ("xxx", function () { return this; });

Date.define = function (key, value, option) { Object.defineProperty (Date.prototype, key, {value, ... option}); }
Date.define ("xxx", function () {});

URL.isURL = function (url, protocol = ["http://", "https://"]) { if (url) if (typeof url === "string") for (var i in protocol) if (url.startsWith (protocol [i])) return true; return false; }

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
	is_url: Object.is_url,
	}