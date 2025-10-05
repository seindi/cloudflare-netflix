var _ = require ("lodash");

function Define ($, key, value, option = {}) { Object.defineProperty ($, key, {enumerable: (option.enumerable || false), configurable: (option.configurable || false), writable: (option.writable || false), value}); }
Define.property = function ($, key, value, option) { Define ($.prototype, key, value, option); }

Object.type = function (input) { return typeof input; }
Object.type.array = function (input) { if (arguments.length) return input instanceof Array || typeof input === "array"; else return Array; }
Object.type.boolean = function (input) { if (arguments.length) return input instanceof Boolean || typeof input === "boolean"; else return Boolean; }
Object.type.date = function (input) { if (arguments.length) return input instanceof Date || typeof input === "date"; else return Date; }
Object.type.error = function (input) { if (arguments.length) return input instanceof Error || typeof input === "error"; else return Error; }
Object.type.function = function (input) { if (arguments.length) return input instanceof Function || typeof input === "function"; else return Function; }
Object.type.number = function (input) { if (arguments.length) return input instanceof Number || typeof input === "number"; else return Number; }
Object.type.object = function (input) { if (arguments.length) return input instanceof Object || typeof input === "object"; else return Object; }
Object.type.regex = function (input) { if (arguments.length) return input instanceof RegExp || typeof input === "regex"; else return RegExp; }
Object.type.promise = function (input) { if (arguments.length) return input instanceof Promise || typeof input === "promise"; else return Promise; }
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
Object.not = function (input) { return ! input; }
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
	}

//