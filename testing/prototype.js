/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

function Define ($, key, value, option = {}) { Object.defineProperty ($, key, {enumerable: (option.enumerable || false), configurable: (option.configurable || false), writable: (option.writable || false), value}); }
Define.property = function ($, key, value, option) { Define ($.prototype, key, value, option); }


/**
 * object
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Object.define = Define;

Object.use = function (data) { return new Object.__use (data); }
Object.__use = class {
	constructor (data) {
		this.data = data;
		}
	export (data) {
		this.data.exports = data;
		}
	}

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
// Object.type.to_origin = function (input) { if (input === "undefined") return undefined; else if (input === "null") return null; else return input; }

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

Object.is.boolean = Object.type_of.boolean;
Object.is.object = Object.type_of.object;
Object.is.array = Array.isArray;
Object.is.string = Object.type_of.string;
Object.is.number = Object.type_of.number;
Object.is.nan = Number.isNaN;
Object.is.integer = Number.isInteger;
Object.is.finite = Number.isFinite;
Object.is.float = function (input) { if (Object.type_of.number (input)) return input.toString ().split (Number.float.separator).length === 2; else return false; }
Object.is.function = Object.type_of.function;
Object.is.date = Object.type_of.date;
Object.is.regex = Object.type_of.regex;
Object.is.define = function (input) { return ! Object.un.define (input); }
Object.is.null = function (input) { return input === null || Object.type_of.null (input); }
Object.is.set = function (input) { return ! (Object.un.define (input) || Object.is.null (input)); }
Object.un = function (input) { return ! input; }
Object.un.define = function (input) { if (arguments.length) return input === undefined; else return undefined; }
Object.to_string = function (input) { if (Object.is.set (input)) return input.toString (); else return ""; }
Object.to_number = function (input) { if (Object.is.set (input)) return Number (input); else return 0; }

Define (Object, "length", function (object) { var length = 0; for (var i in object) length ++; return length; });
Define (Object, "concat", function (object, data) { var concat = Object.clone (object); for (var i in data) concat [i] = data [i]; return concat; });
Define (Object, "clone", function (object) { return JSON.parse (JSON.stringify (object)); });

Object.key = function (object) { return Object.keys (object); }
Object.value = function (object) { return Object.values (object); }
Object.walk = function (object, i) { var data = object, walk = i.split ("."); for (var i in walk) data = data [walk [i]]; return data; }
Object.exclude = function (object, exclude) {
	var data = {}
	for (var i in object) if (exclude.includes (i)) continue; else data [i] = object [i];
	return data;
	}

Object.is.ip = function (input) {
	if (Function.network.adapter) return Function.network.adapter.isIP (input);
	else if (typeof input === "string") return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/).test (input.trim ());
	return false;
	}

Object.is.email = function (input) {
	if (typeof input === "string") {
		if (input = input.toLowerCase ().trim ()) {
			var user, domain, split = input.split ("@");
			if (split.length === 2) if (user = split [0].trim ()) if (domain = split [1].trim ()) if (URL.parse_url ("http://" + domain).domain.name) return true;
			}
		}
	return false;
	}

Object.auth = function (host, user, password) {
	host = host || Function.ip.reserve ();
	user = (user || "").toString ().toLowerCase ().trim ();
	password = (password || "").toString ();
	var email = "";
	if (Object.is.email (user)) if (email = user) user = email.split ("@") [0];
	else null;
	else email = [user, host].join ("@");
	return {host, user: {name: user, email}, password}
	}

Object.auth.check = function (host, user, password, option) {
	option = option || {}
	option ["user:length"] = option ["user:length"] || 6;
	option ["password:length"] = option ["password:length"] || 8;
	var error = [];
	var auth = Object.auth (host, user, password);
	if (auth.user.name.length < option ["user:length"]) error.push ("user:length");
	if (auth.password.length < option ["password:length"]) error.push ("password:length");
	if (option.email) if (Object.is.email (user) === false) error.push ("user:email");
	return {auth, error}
	}

/**
 * array
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Define.property (Array, "string", function () { return this.toString (); });
Define.property (Array, "clone", function () { return Object.clone (this); });
Define.property (Array, "single", function (value) { for (var i in this) return this [i]; return value; });
Define.property (Array, "begin", function (value) { for (var i in this) return this [i]; return value; });
Define.property (Array, "end", function (value) { for (var i in this) value = this [i]; return value; });
Define.property (Array, "exist", function (value, offset) { if (Array.isArray (value)) { for (var i in value) if (this.includes (value [i])) return true; return false; } else return this.includes (value, offset); });
Define.property (Array, "max", function () { return Math.max (... this); });
Define.property (Array, "min", function () { return Math.min (... this); });
Define.property (Array, "next", function (offset) { return this [Number (offset) + 1]; });
Define.property (Array, "previous", function (offset) { return this [Number (offset) - 1]; });
Define.property (Array, "unique", function () { return Array.from (new Set (this)); });
Define.property (Array, "json", function () { return JSON.stringify (this); });
Define.property (Array, "shuffle", function () { return Array.shuffle (this); });
Define.property (Array, "index_of", function (value, offset) { return Function.index_of (this.indexOf (value, offset)); });
Define.property (Array, "implode", function () { return this.join (" "); });

Define.property (Array, "select", function (filter) { var length = Object.length (filter); return this.filter (function (data) { var count = 0; for (var i in filter) { if (i.includes (".")) { var key = i.split ("."); for (var x in key) data = data [key [x]]; if (data === filter [i]) count ++; } else if (data [i] === filter [i]) count ++; } if (count === length) return true; else return false; }); });
Define.property (Array, "insert", function (offset, ... value) { return this.splice (offset, 0, ... value); });
Define.property (Array, "update", function (offset, ... value) { return this.splice (offset, 1, ... value); });
Define.property (Array, "delete", function (offset, length = 1) { return this.splice (offset, length); });

Define.property (Array, "offset", function (offset, limit) { var data = [], count = 0, counter = 0; if (arguments.length === 1) for (var i in this) { count ++; data.push (this [i]); if (count >= offset) break; } else for (var i in this) { if (counter >= offset) { count ++; data.push (this [i]); if (count >= limit) break; } counter ++; } return data; });
Define.property (Array, "order", function (... sort) { var data = this.clone (); for (var i in sort) { for (var x in sort [i]) { if (sort [i][x] === "ascending") data.sort (function (a, b) { if (Object.walk (a, this.key) < Object.walk (b, this.key)) return 0 - 1; else return 0; }.bind ({key: x})); if (sort [i][x] === "descending") data.sort (function (a, b) { if (Object.walk (a, this.key) > Object.walk (b, this.key)) return 0 - 1; else return 0; }.bind ({key: x})); } } return data; });

Array.shuffle = function (array, data = []) { if (array.length) { var i = Number.random (array.length - 1); data.push (array [i]); array.delete (i); Array.shuffle (array, data); } return data; }

/**
 * string
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Define.property (String, "string", function () { return this.toString (); });
Define.property (String, "number", function () { return Number (this); });
Define.property (String, "integer", function () { return parseInt (this); });
Define.property (String, "float", function () { return parseFloat (this); });
Define.property (String, "small", function () { return this.toLowerCase (); });
Define.property (String, "big", function () { return this.toUpperCase (); });
Define.property (String, "begin", function (input = 1) { if (typeof input === "string") return this.startsWith (input); else return this.substr (input); });
Define.property (String, "end", function (input = 1) { if (typeof input === "string") return this.endsWith (input); else return this.substr (this.length - input); });
Define.property (String, "exist", function (input, offset) { return this.includes (input, offset); });
Define.property (String, "after", function (input, offset) { if ((offset = this.indexOf (input, offset)) >= 0) return this.substr (offset + input.length); else return ""; });
Define.property (String, "before", function (input, offset) { if ((offset = this.indexOf (input, offset)) >= 0) return this.substr (0, offset); else return ""; });
Define.property (String, "shift", function (input = 1) { if (typeof input === "string") return this.substr (input.length); else return this.substr (input); });
Define.property (String, "pop", function (input = 1) { if (typeof input === "string") return this.slice (0, (- input.length)); else return this.slice (0, (- input)); });
Define.property (String, "reverse", function () { return this.split ("").reverse ().join (""); });
Define.property (String, "shuffle", function () { return this.split ("").shuffle ().join (""); });
Define.property (String, "index_of", function (input, offset) { return Function.index_of (this.indexOf (input, offset)); });
Define.property (String, "json", function () { return JSON.parse (this); });
Define.property (String, "md5", function () { return Function.hash.md5 (this); });
Define.property (String, "sha1", function () { return Function.hash.sha1 (this); });
Define.property (String, "sha256", function () { return Function.hash.sha256 (this); });

Define.property (String, "to_hash", function () {
	return this.md5 () + this.sha1 () + this.sha256 ();
	});

Define.property (String, "to_code", function () {
	var hash = 0, char;
	if (this.length === 0) return hash;
	for (var i = 0; i < this.length; i++) {
		char = this.charCodeAt (i);
		hash = ((hash << 5) - hash) + char; hash |= 0;
		}
	return hash;
	});

Define.property (String, "to_replace", function (key, value) {
	if (typeof key === "object") {
		var data = this.concat ("");
		for (var i in key) {
			if (value) if (value.exclude) if (value.exclude.includes (i)) continue;
			else data = data.split ("{{ " + i + " }}").join (key [i]);
			else data = data.split ("{{ " + i + " }}").join (key [i]);
			else data = data.split ("{{ " + i + " }}").join (key [i]);
			}
		return data;
		}
	else return this.split (key).join (value);
	});

Define.property (String, "to_param", function (param) {
	if (typeof param === "string") return this.to_replace ("*", param);
	var data = this.toString ();
	for (var i in param) {
		var value = param [i];
		var key = ":" + i;
		var index = data.indexOf (key);
		var length = index + key.length;
		if (index < 0) continue;
		else data = data.substr (0, index) + value + data.substr (length);
		}
	return data;
	});

Define.property (String, "print_format", function (... format) {
	var data = this.split ("%s");
	var index = - 1;
	for (var i in format) { index += 2; data.splice (index, 0, format [i]); }
	return data.join ("");
	});

String.char = function () {}
String.char.small = "abcdefghijklmnopqrstuvwxyz";
String.char.big = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
String.char.alpha = {numeric: "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789"}
String.char.empty = "";
String.char.space = " ";
String.char.coma = ",";
String.char.eol = ";";
String.char.separator = {coma: ", ", eol: "; "}

/**
 * number
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Define.property (Number, "string", function () { return this.toString (); });
Define.property (Number, "number", function () { return Number (this); });
Define.property (Number, "integer", function () { return parseInt (this); });
Define.property (Number, "float", function () { return parseFloat (this); });
Define.property (Number, "byte", function (option) { return Number.byte.parse (this, option); });

Number.char = "0123456789";
Number.random = function (number) { return Math.floor (Math.random () * (number + 1)); }
Number.format = function (number) { return new Intl.NumberFormat ("id").format (number || 0); }
Number.byte = function (number, option) { return Number.byte.parse (number, option); }
Number.byte.parse = function (number, option = {}) { if (option.decimal) { option.decimal.length = option.decimal.length || 3; option.decimal.separator = option.decimal.separator || Number.float.separator; } else { option.decimal = {length: 3, separator: Number.float.separator} } option.separator = option.separator || Number.separator; option.thousand = option.thousand || 3; var unit_of, unit = {log: Number.byte.unit.log.clone ().reverse (), name: Number.byte.unit.name.clone ().reverse ()}, size = 0; for (var i in unit.log) if ((size = number / Number [unit.log [i]] ()) >= 1) if (unit_of = unit.log [i]) break; var split = size.toString ().split (Number.float.separator); var integer = split [0], decimal = (split [1] || "").substr (0, option.decimal.length); var size_of = [integer.reverse ().to_split (option.separator, option.thousand).reverse ()]; if (decimal) size_of.push (option.decimal.separator, decimal); size_of = size_of.join ("") + " " + unit_of; return {size, size_of, integer, decimal, unit: {log: unit_of, name: unit.name [i]}} }
Number.byte.unit = {log: ["B", "KB", "MB", "GB", "TB"], name: ["Byte", "KiloByte", "MegaByte", "GigaByte", "TeraByte"], "B": "Byte", "KB": "KiloByte", "MB": "MegaByte", "GB": "GigaByte", "TB": "TeraByte"}
Number.B = function (number = 1) { return number; }
Number.KB = function (number = 1) { return number * (1024); }
Number.MB = function (number = 1) { return number * (1024 * 1024); }
Number.GB = function (number = 1) { return number * (1024 * 1024 * 1024); }
Number.TB = function (number = 1) { return number * (1024 * 1024 * 1024 * 1024); }
Number.float = function () {}
Number.float.separator = (1 / 2).toString ().substr (1, 1);
Number.zero = 0;
Number.one = 1;

/**
 * math
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Define (Math, "__", function () {});

/**
 * date time
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Date.time = class {
	constructor (... date) {
		this.date = date;
		this.month ();
		this.day ();
		}
	month (month) { this.__month = month || Date.time.month.name || Date.month.name; }
	day (day) { this.__day = day || Date.time.day.name || Date.day.name; }
	utc (__) { return this.now (__); }
	gmt (__) { return this.now (__); }
	now (__) {
		if (__) if (typeof __ === "string") this.__ = (__ = Date.Time.zone.data [__.toLowerCase ()]) ? __.offset : {}
		else this.__ = __;
		else if (this.__) {}
		else this.__ = (__ = Date.Time.zone.data [Date.time.zone.name]) ? __.offset : {}
		var date = new Date (... this.date);
		this.property = Date.property (this.link = new Date (date.getUTCFullYear (), date.getUTCMonth (), date.getUTCDate (), date.getUTCHours () + (this.__.hour || 0), date.getUTCMinutes () + (this.__.minute || 0), date.getUTCSeconds (), date.getUTCMilliseconds ()));
		return this;
		}
	format (format) {
		var date = [];
		var to_format = Date.to_format (this.property, {month: this.__month, day: this.__day});
		format = Date.format.data [format] || format;
		format = format.split ("");
		for (var i in format) date.push (to_format [format [i]] || format [i]);
		return date.join ("");
		}
	}

Date.time.zone = function (value) { Define (Date.time.zone, "name", value, {writable: true}); }
Date.time.month = function (value) { Define (Date.time.month, "name", value, {writable: true}); }
Date.time.day = function (value) { Define (Date.time.day, "name", value, {writable: true}); }
Date.time.expire = function (stamp, expire, now) { return new Date.time (stamp).now (expire).property.stamp < new Date.time (now || Date.now ()).now ().property.stamp; }

Date.property = function (date) {
	var property = {
		year: date.getFullYear ().toString (),
		month: (date.getMonth () + 1).toString ().padStart (2, "0"),
		day: date.getDate ().toString ().padStart (2, "0"),
		hour: date.getHours ().toString ().padStart (2, "0"),
		minute: date.getMinutes ().toString ().padStart (2, "0"),
		second: date.getSeconds ().toString ().padStart (2, "0"),
		ms: date.getMilliseconds ().toString ().padEnd (3, "0"),
		week: date.getDay ().toString ().padStart (2, "0"),
		stamp: date.getTime (),
		}
	var hour = date.getHours ();
	if (hour > 12) hour = hour - 12;
	property ["hour:extra"] = hour.toString ().padStart (2, "0");
	if (date.getHours () < 12) property.meridiem = "AM";
	else property.meridiem = "PM";
	property.stamp = date.getTime ();
	property.YMDHIS = parseInt (property.year + property.month + property.day + property.hour + property.minute + property.second);
	property.YMD = property.year + property.month + property.day;
	property.HIS = property.hour + property.minute + property.second;
	return property;
	}

Date.to_format = function (date, option) {
	return {
		"Y": date.year,
		"M": date.month, "F": option.month [date.month],
		"D": date.day, "N": option.day [date.week],
		"H": date.hour, "J": date ["hour:extra"],
		"I": date.minute,
		"S": date.second,
		"A": date.meridiem,
		}
	}

Date.format = function (format, stamp) { return new Date.time (stamp).now ().format (format); }
Date.format.set = function (key, value) { Date.format.data [key] = value; }
Date.format.data = {
	"default": "N, F D, Y - J:I A",
	}

Date.month = {name: {"01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "Juli", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"}}
Date.day = {name: {"01": "Monday", "02": "Tuesday", "03": "Wednesday", "04": "Thursday", "05": "Friday", "06": "Saturday", "07": "Sunday"}}

Date.Time = class {}

Date.Time.sleep = function (context, second = 1) { return setTimeout (context, (second * 1000)); }
Date.Time.sleep.emit = function (context) { return setTimeout (context, 100); }
Date.Time.sleep.clear = function (context) { return clearTimeout (context); }
Date.Time.interval = function (context, second = 1) { return setInterval (context, (second * 1000)); }
Date.Time.interval.clear = function (context) { return clearInterval (context); }

Date.Time.stamp = function () { return Date.now (); }

Date.Time.zone = function () {}
Date.Time.zone.set = function (key, value) { Date.Time.zone.data [key] = value; }
Date.Time.zone.data = {
	"asia/jakarta": {name: "Asia/Jakarta", canonical: "+07:00", offset: {hour: 7, minute: 0}},
	"utc": {name: "UTC", canonical: "+00:00", offset: {hour: 0, minute: 0}},
	"gmt": {name: "GMT", canonical: "+00:00", offset: {hour: 0, minute: 0}},
	}

Date.timeout = function (context) { if (Object.is.number (context)) return Date.timeout.value = context; else return setTimeout (context, (Date.timeout.value * 1000)); }
Date.timeout.clear = function (context) { return clearTimeout (context); }
Date.timeout.value = 10;

Date.timezone = function () {}

/**
 * event
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Event.data = {}
Event.on = function (key, value) { if (Event.data [key]) Event.data [key].push (value); else Event.data [key] = [value]; }
Event.emit = function (key, ... value) { var data; for (var i in Event.data [key]) data = Event.data [key][i].call ({data}, ... value); return data; }
Event.apply = function (e, prefix) {
	if (e.on || e.emit) {}
	else {
		e.on = function (key, value) { return Event.on ([prefix, key].join (String.char.space), value); }
		e.emit = function (key, ... value) { return Event.emit ([prefix, key].join (String.char.space), ... value); }
		}
	}

/**
 * promise
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Promise.io = Function.promise = class {
	constructor (context) {
		this.promise = new Promise (context);
		}
	then (context) {
		if (this.error) this.promise = this.promise.then (context).catch (this.error);
		else this.context = context;
		return this;
		}
	catch (context) {
		if (this.context) this.promise = this.promise.then (this.context).catch (context);
		else this.error = context;
		return this;
		}
	emit (context) {
		this.promise = this.promise.then (context).catch (function () {});
		return this;
		}
	}

Function.promise.adapter = Promise;
Function.promise.resolve = Promise.resolve;
Function.promise.reject = Promise.reject;

/**
 * function
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.code = function (code) {
	return new Function ("self", "window", "'use strict';" + code);
	}

Function.context = function (context) { return context || function () {} }
Function.option = function (option, base) { var data = Object.clone (option || {}); for (var i in base) if ((i in data) === false) data [i] = base [i]; return data; }
Function.index_of = function (input) { if (input >= 0) return input; }

/**
 * hash
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.hash = function (input) { return Function.hash.sha256 (input); }
Function.hash.require = function (adapter) { if (adapter === Function.browser || adapter === "browser") return Function.browser.hash = require ("crypto-js"); else return Function.hash.adapter = require ("crypto"); }
Function.hash.md5 = function (input) { if (Function.hash.adapter) return Function.hash.adapter.createHash ("md5").update (input.toString ()).digest ("hex"); if (Function.browser.hash) return Function.browser.hash.MD5 (input).toString (); }
Function.hash.sha1 = function (input) { if (Function.hash.adapter) return Function.hash.adapter.createHash ("sha1").update (input.toString ()).digest ("hex"); if (Function.browser.hash) return Function.browser.hash.SHA1 (input).toString (); }
Function.hash.sha256 = function (input) { if (Function.hash.adapter) return Function.hash.adapter.createHash ("sha256").update (input.toString ()).digest ("hex"); if (Function.browser.hash) return Function.browser.hash.SHA256 (input).toString (); }
Function.hash.shuffle = function () { return String.char.alpha.numeric.shuffle ().substr (0, 24); }

/**
 * header
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.header = function () {}
Function.header.error = {in_use: 226, request: 400, forbidden: 403, exist: 404, auth: 401, timeout: 408, conflict: 409, locked: 423, internal: 500, implemented: 501}
Function.header.status = function (code) { return {code, message: Function.header.status.code [code]} }
Function.header.status.success = Function.header.status.OK = 200;
Function.header.status.code = {
	100: "Continue",
	101: "Switching Protocols",
	102: "Processing",
	200: "OK",
	201: "Created",
	202: "Accepted",
	203: "Non-authoritative Information",
	204: "No Content",
	205: "Reset Content",
	206: "Partial Content",
	207: "Multi-Status",
	208: "Already Reported",
	226: "IM Used",
	300: "Multiple Choices",
	301: "Moved Permanently",
	302: "Found",
	303: "See Other",
	304: "Not Modified",
	305: "Use Proxy",
	307: "Temporary Redirect",
	308: "Permanent Redirect",
	400: "Bad Request",
	401: "Unauthorized",
	402: "Payment Required",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	406: "Not Acceptable",
	407: "Proxy Authentication Required",
	408: "Request Timeout",
	409: "Conflict",
	410: "Gone",
	411: "Length Required",
	412: "Precondition Failed",
	413: "Payload Too Large",
	414: "Request-URI Too Long",
	415: "Unsupported Media Type",
	416: "Requested Range Not Satisfiable",
	417: "Expectation Failed",
	418: "I'm a teapot",
	421: "Misdirected Request",
	422: "Unprocessable Entity",
	423: "Locked",
	424: "Failed Dependency",
	426: "Upgrade Required",
	428: "Precondition Required",
	429: "Too Many Requests",
	431: "Request Header Fields Too Large",
	444: "Connection Closed Without Response",
	451: "Unavailable For Legal Reasons",
	499: "Client Closed Request",
	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
	505: "HTTP Version Not Supported",
	506: "Variant Also Negotiates",
	507: "Insufficient Storage",
	508: "Loop Detected",
	510: "Not Extended",
	511: "Network Authentication Required",
	599: "Network Connect Timeout Error",
	600: "Failed",
	}

/**
 * network
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.network = function () {}
Function.network.require = function () { return Function.network.adapter = require ("node:net"); }
Function.network.is = function () {}
Function.network.is.ip = function (ip) { return Function.network.adapter.isIP (ip); }

/**
 * express
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.express = function () { return Function.express.adapter (); }
Function.express.static = function (path) { return Function.express.adapter.static (path); }
Function.express.body = function () {}
Function.express.body.parser = function () { return Function.express.adapter.body.parser.json (); }
Function.express.cross = function () {}
Function.express.cross.origin = function (option) { return Function.express.adapter.cross.origin (option); }
Function.express.cross.origin.header = function () {
	return function (request, response, next) {
		response.setHeader ("Access-Control-Allow-Origin", "*");
		response.setHeader ("Access-Control-Allow-Credentials", true);
		response.setHeader ("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		response.setHeader ("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-IP, X-Session");
		next ();
		}
	}

/**
 * theme
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.theme = function () {
	Object.theme = Object.theme || {}
	Object.theme.component = Object.theme.component || {}
	}

Function.theme.component = function (component) { return Object.theme.component [component]; }
Function.theme.component.exist = function (component) { return component in Object.theme.component; }
Function.theme.component.register = function (key, value) { return Object.theme.component [key] = value; }

Function.theme ();

/**
 * router
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.router = function () {
	Function.router.path.data = {}
	Object.router = Object.router || {}
	}

Function.router.dynamic = function (data) { if (data) Object.router.dynamic = data; return Object.router.dynamic; }
Function.router.static = function (data) { if (data) Object.router.static = data; return Object.router.static; }

Function.router.path = function (router) {
	if (router) {
		var content = ["playlist", "article", "gallery", "image", "photo", "audio", "sound", "music", "video", "game", "podcast", "people"];
		Function.router.path.data ["content"] = ("/%s/:slug+").print_format (router ["content"].path);
		Function.router.path.data ["content:index"] = ("/%s/").print_format (router ["content"].path);
		for (var i in content) {
			Function.router.path.data ["content:" + content [i]] = ("/%s/:slug+").print_format (router ["content:" + content [i]].path);
			Function.router.path.data ["content-" + content [i] + ":index"] = ("/%s/").print_format (router ["content:" + content [i]].path);
			}
		var page = ["event", "promo"];
		Function.router.path.data ["page"] = ("/%s/:slug+").print_format (router ["page"].path);
		Function.router.path.data ["page:index"] = ("/%s/").print_format (router ["page"].path);
		for (var i in page) {
			Function.router.path.data ["page:" + page [i]] = ("/%s/:slug+").print_format (router ["page:" + page [i]].path);
			Function.router.path.data ["page-" + page [i] + ":index"] = ("/%s/").print_format (router ["page:" + page [i]].path);
			}
		var pos = ["product", "store", "shop"];
		for (var i in pos) {
			Function.router.path.data [pos [i]] = ("/%s/:slug+").print_format (router [pos [i]].path);
			Function.router.path.data [pos [i] + ":index"] = ("/%s/").print_format (router [pos [i]].path);
			}
		var taxonomy = ["tag", "category", "genre", "author"];
		for (var i in taxonomy) {
			Function.router.path.data [taxonomy [i]] = ("/%s/:slug+").print_format (router [taxonomy [i]].path);
			Function.router.path.data [taxonomy [i] + ":index"] = ("/%s/").print_format (router [taxonomy [i]].path);
			}
		var extra = ["search", "sitemap", "setting"];
		for (var i in extra) {
			Function.router.path.data [extra [i]] = ("/%s/:slug+").print_format (router [extra [i]].path);
			Function.router.path.data [extra [i] + ":index_of"] = ("/%s").print_format (router [extra [i]].path);
			}
		if (Function.router.path.data ["archive"] = ("/%s/:slug+").print_format (router ["archive"].path)) {
			Function.router.path.data ["archive:index"] = ("/%s/").print_format (router ["archive"].path);
			Function.router.path.data ["archive:day"] = ("/%s/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug+").print_format (router ["archive"].path);
			Function.router.path.data ["archive-day:index"] = ("/%s/:year(\\d+)/:month(\\d+)/:day(\\d+)/").print_format (router ["archive"].path);
			Function.router.path.data ["archive:month"] = ("/%s/:year(\\d+)/:month(\\d+)/:slug+").print_format (router ["archive"].path);
			Function.router.path.data ["archive-month:index"] = ("/%s/:year(\\d+)/:month(\\d+)/").print_format (router ["archive"].path);
			Function.router.path.data ["archive:year"] = ("/%s/:year(\\d+)/:slug+").print_format (router ["archive"].path);
			Function.router.path.data ["archive-year:index"] = ("/%s/:year(\\d+)/").print_format (router ["archive"].path);
			}
		Function.router.path.data ["user:slug"] = ("/%s:slug+").print_format (router ["user:slug"]);
		}
	return Function.router.path.data;
	}

Function.router ();
Function.router.path (Object.router.dynamic || Function.router.dynamic ({
	"content": {path: "content"}, "content:playlist": {path: "playlist"}, "content:article": {path: "article"}, "content:gallery": {path: "gallery"}, "content:image": {path: "image"}, "content:photo": {path: "photo"}, "content:audio": {path: "audio"}, "content:sound": {path: "sound"}, "content:music": {path: "music"}, "content:video": {path: "video"}, "content:game": {path: "game"}, "content:podcast": {path: "podcast"}, "content:people": {path: "people"},
	"page": {path: "page"}, "page:event": {path: "event"}, "page:promo": {path: "promo"},
	"product": {path: "product"}, "store": {path: "store"}, "shop": {path: "shop"},
	"tag": {path: "tag"}, "category": {path: "category"}, "genre": {path: "genre"},
	"author": {path: "author"},
	"search": {path: "search"},
	"sitemap": {path: "sitemap"},
	"setting": {path: "setting"},
	"archive": {path: "archive"},
	"user:slug": "@",
	}));

/**
 * db
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.db = function () {}
Function.db.object = function () {}
Function.db.object.id = function (... id) { return Function.db.mongo.object.id (... id); }
Function.db.object.id.rand = function () { return Math.random ().toString ().sha256 ().substr (0, 24); }
Function.db.object.rand = function () { return Function.db.mongo.object.rand (); }
Function.db.object.stamp = function (key, value) {
	var now = Date.now ();
	if (key === "insert") {
		var stamp = {select: 0, insert: now, update: now, delete: 0}
		if (value) {
			if (value.select) stamp.select = value.select;
			if (value.insert) stamp.insert = value.insert;
			if (value.update) stamp.update = value.update;
			if (value.delete) stamp.delete = value.delete;
			}
		return stamp;
		}
	}

Function.db.table = function (collection) { if (collection.startsWith ("view:")) collection = collection.split (":").join ("_"); else collection = ["table", collection].join ("_"); return collection; }
Function.db.collection = function (collection) { if (collection) return Function.db.collection.data [collection] || collection; else return Function.db.collection.data; }
Function.db.collection.data = {
	"account": "account", "user": "user", "profile": "profile",
	"content": "content", // "content:playlist": "content_playlist", "content:article": "content_article", "content:gallery": "content_gallery", "content:image": "content_image", "content:photo": "content_photo", "content:audio": "content_audio", "content:sound": "content_sound", "content:music": "content_music", "content:video": "content_video", "content:game": "content_game", "content:podcast": "content_podcast", "content:people": "content_people",
	"page": "page", // "page:event": "page_event", "page:promo": "page_promo",
	"taxonomy": "taxonomy", "tag": "taxonomy_tag", "category": "taxonomy_category", "genre": "taxonomy_genre",
	"store": "store", "product": "product",
	"sale": "sale",
	"ip-address": "ip_address",
	"visitor": "visitor",
	"virtual": "virtual",
	}

Function.db.SQL_NOT_EQUAL = "$ne";
Function.db.SQL_GREATER_THAN = "$gt";
Function.db.SQL_GREATER_THAN_EQUAL = "$gte";

Function.db.json = class {
	constructor (directory) {
		this.directory = directory;
		}
	collection (collection) {
		return new Function.db.json.collection (this, Function.db.collection (collection));
		}
	exist (collection) {
		return Function.file.exist (Function.path.join (this.directory, Function.file.extension.json (Function.db.collection (collection))));
		}
	}

Function.db.json.collection = class {
	constructor (json, collection) {
		this.json = json;
		this.collection = collection;
		this.file = Function.path.join (this.json.directory, Function.file.extension.json (this.collection));
		try {
			if (Function.file.exist (this.file)) this.load ();
			else Function.file.put.content (this.file, JSON.stringify.pretty (this.data = []));
			}
		catch (error) { this.error = error; }
		this.prop = {}
		}
	load () { this.data = Function.file.get.content (this.file).json (); }
	select (filter) {
		var promise = function (resolve, reject) {
			var data = this.db.data.select (filter);
			if (this.db.prop.sort) data = data.order (this.db.prop.sort);
			if (this.db.prop.limit) if (this.db.prop.skip) data = data.offset (this.db.prop.skip, this.db.prop.limit);
			else data = data.offset (this.db.prop.limit);
			resolve (data);
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	insert (data) {
		var promise = function (resolve, reject) {
			if (Array.isArray (data)) {
				var tmp = [];
				for (var i in data) {
					var now = Date.now ();
					var _id = data [i]._id || Function.db.object.id.rand ();
					var _stamp = Function.db.object.stamp ("insert", data [i]._stamp);
					var _random_point = Function.db.object.rand ();
					this.db.data.push ({_id, _stamp, _random_point, ... Object.exclude (data [i], ["_id", "_stamp", "_random_point"])});
					tmp.push ({_id, _stamp, _random_point});
					}
				this.db.save ();
				resolve (tmp);
				}
			else {
				var now = Date.now ();
				var _id = data._id || Function.db.object.id.rand ();
				var _stamp = Function.db.object.stamp ("insert", data._stamp);
				var _random_point = Function.db.object.rand ();
				this.db.data.push ({_id, _stamp, _random_point, ... Object.exclude (data, ["_id", "_stamp", "_random_point"])});
				this.db.save ();
				resolve ({_id, _stamp, _random_point});
				}
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	update () {}
	delete () {}
	save (data) {
		Function.file.put.content (this.file, JSON.stringify ((data || this.data), ... JSON.pretty));
		return this;
		}
	sort (sort) { this.prop.sort = sort; return this; }
	skip (skip) { this.prop.skip = skip; return this; }
	limit (limit) { this.prop.limit = limit; return this; }
	offset (skip, limit) { this.prop.skip = skip; this.prop.limit = limit; return this; }
	}

Function.db.io = class {
	constructor (adapter) { this.adapter = adapter; }
	collection (collection) { return new Function.db.io.collection (this, collection); }
	}

Function.db.io.collection = class {
	constructor (db, collection) {
		this.socket = db;
		this.collection = collection;
		this.prop = {}
		}
	select (filter) {
		var promise = function (resolve, reject) {
			this.db.socket.adapter.emit ("db:select", {collection: this.db.collection, filter, ... this.db.prop}, function (response) {
				if (response.error) reject (response);
				else resolve (response);
				});
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	insert (data) {
		var promise = function (resolve, reject) {
			this.db.socket.adapter.emit ("db:insert", {collection: this.db.collection, data: this.db.data}, function (response) {
				if (response.error) reject (response);
				else resolve (response);
				});
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	update (filter) {
		var promise = function (resolve, reject) {
			this.db.socket.adapter.emit ("db:update", {collection: this.db.collection, filter, data: this.db.data, ... this.db.prop}, function (response) {
				if (response.error) reject (response);
				else resolve (response);
				});
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	delete (filter) {
		var promise = function (resolve, reject) {
			this.db.socket.adapter.emit ("db:delete", {collection: this.db.collection, filter, ... this.db.prop}, function (response) {
				if (response.error) reject (response);
				else resolve (response);
				});
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	trash (filter) {
		var promise = function (resolve, reject) {
			this.db.socket.adapter.emit ("db:trash", {collection: this.db.collection, filter, ... this.db.prop}, function (response) {
				if (response.error) reject (response);
				else resolve (response);
				});
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	count (filter) {
		var promise = function (resolve, reject) {
			this.db.socket.adapter.emit ("db:count", {collection: this.db.collection, filter}, function (response) {
				if (response.error) reject (response);
				else resolve (response);
				});
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	set (data) { this.data = data; return this; }
	one (one) { if (arguments.length) this.prop.one = one; else this.prop.one = true; return this; }
	sort (sort) { this.prop.sort = sort; return this; }
	skip (skip) { this.prop.skip = skip; return this; }
	limit (limit) { this.prop.limit = limit; return this; }
	}

/**
 * db : mongo
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.db.mongo = class {
	constructor (config) {
		if (config) this.start (config);
		}
	start (config) {
		if (config) this.config = config;
		this.url = ["mongodb", "://"];
		if (this.config.password) this.url.push (this.config.user, ":", this.config.password, "@");
		else if (this.config.user) this.url.push (this.config.user, "@");
		this.url.push (this.config.host);
		this.url.push (":", this.config.port);
		this.url = this.url.join ("");
		this ["data:base"] = this.config.data;
		this.client = new Function.db.mongo.adapter.MongoClient (this.url);
		}
	connect (context) {
		this.client.connect ().then (context).catch (function (error) {});
		}
	use (db, client) {
		if (client) db = [db].join ("_");
		return new Function.db.mongo.use (this, db);
		}
	}

Function.db.mongo.use = class {
	constructor (mongo, db) {
		this.mongo = mongo;
		this.name = db;
		this.adapter = this.mongo.client.db (this.name);
		}
	collection (collection) {
		return new Function.db.mongo.collection (this.mongo, this, Function.db.collection (collection));
		}
	view (collection) {
		return new Function.db.mongo.collection.view (this.mongo, this, Function.db.collection (collection));
		}
	setup () {
		var collection = Function.db.collection ();
		for (var i in collection) this.collection (collection [i]).create ();
		setTimeout (function () { for (var i in collection) this.db.collection (collection [i]).create ("index", "_random_point").emit (); }.bind ({db: this}), 1000);
		setTimeout (function () {
			// this.db.view ("collection").create ("view", "collection");
			}.bind ({db: this}), 2000);
		}
	}

Function.db.mongo.collection = class {
	constructor (mongo, db, collection) {
		this.mongo = mongo;
		this.db = db;
		this.collection = Function.db.table (collection);
		this.prop = {}
		this.index = new Function.db.mongo.collection.index (this.mongo, this.db, this);
		}
	start () {
		this.adapter = this.db.adapter.collection (this.collection);
		}
	create (key, value) {
		if (key === "index") {
			this.start ();
			return this.index.create (value);
			}
		else {
			this.adapter = this.db.adapter;
			var promise = function (resolve, reject) {
				if (this.db.collection) this.db.adapter.createCollection (this.db.collection, function (error, db) {
					if (error) reject (error);
					else resolve (db);
					});
				}
			return new Promise.io (promise.bind ({db: this}));
			}
		}
	select (filter, option) {
		this.action = "select";
		this.filter = filter || {}
		this.option = option || {trash: false}
		this.promise = function (resolve, reject) {
			if (typeof this.db.filter === "string") this.db.filter = {_id: Function.db.mongo.object.id (this.db.filter)}
			else if (this.db.filter instanceof Function.db.mongo.adapter.ObjectId) this.db.filter = {_id: this.db.filter}
			else if ("id" in this.db.filter) {
				if (typeof this.db.filter.id === "string") this.db.filter._id = Function.db.mongo.object.id (this.db.filter.id);
				else if (this.db.filter.id instanceof Function.db.mongo.adapter.ObjectId) this.db.filter._id = this.db.filter.id;
				delete this.db.filter.id;
				}
			if (this.db.option.trash) {}
			else this.db.filter = {... this.db.filter, "_stamp.delete": 0}
			var db;
			if (this.db.prop.join) {
				var join = [];
				for (var i in this.db.prop.join) {
					if (parseInt (i) === 0) join.push ({$match: this.db.filter}, {$lookup: {from: this.db.prop.join [i].collection, localField: this.db.option.field, foreignField: this.db.prop.join [i].field, as: this.db.prop.join [i].output}});
					else if (this.db.prop.join [i].filter) join.push ({$match: this.db.filter}, {$match: this.db.filter}, {$lookup: {from: this.db.prop.join [i].collection, localField: this.db.option.field, foreignField: this.db.prop.join [i].field, as: this.db.prop.join [i].output}});
					else join.push ({$lookup: {from: this.db.prop.join [i].collection, localField: this.db.option.field, foreignField: this.db.prop.join [i].field, as: this.db.prop.join [i].output}});
					}
				db = this.db.adapter.aggregate (join).toArray ().then (function (db) {
					var result = {data: db.map (function (data) {
						data.id = data._id.toString ();
						for (var i in join) data [join [i].$lookup.as] =  data [join [i].$lookup.as].map (function (data) { data.id = data._id.toString (); return data; })
						return data;
						})}
					if (this.context) this.context.call (db, result);
					resolve (result);
					}.bind ({context: this.context}));
				}
			else if (this.db.prop.one) db = this.db.adapter.findOne (this.db.filter).then (function (db) {
				var result = {data: []}
				if (db) result.data.push ({... db, id: db._id.toString ()});
				if (this.context) this.context.call (db, result);
				resolve (result);
				}.bind ({context: this.context}));
			else {
				db = this.db.adapter.find (this.db.filter);
				if (this.db.prop.sort) db = db.sort (this.db.prop.sort);
				if (this.db.prop.skip) db = db.skip (this.db.prop.skip);
				if (this.db.prop.limit) db = db.limit (this.db.prop.limit);
				db = db.toArray ().then (function (db) {
					var result = {data: db.map (function (data) { data.id = data._id.toString (); return data; })}
					if (this.context) this.context.call (db, result);
					resolve (result);
					}.bind ({context: this.context}));
				}
			db.catch (reject);
			}
		return this;
		}
	insert (data) {
		this.action = "insert";
		this.data = data;
		this.promise = function (resolve, reject) {
			var _stamp = Function.db.object.stamp ("insert");
			var _random_point = Function.db.mongo.object.rand ();
			var db;
			if (Array.isArray (this.db.data)) db = this.db.adapter.insertMany (this.db.data.map (function (data) { return {_stamp, _random_point, ... data} }), {ordered: true}).then (function (db) { var _id = [], id = []; for (var i in db.insertedIds) if (_id.push (db.insertedIds [i])) id.push (db.insertedIds [i].toString ()); resolve ({count: db.insertedCount, id, _id, _stamp, _random_point}); });
			else db = this.db.adapter.insertOne ({_stamp, _random_point, ... this.db.data}).then (function (db) { resolve ({_id: db.insertedId, _stamp, _random_point, id: db.insertedId.toString ()}); });
			db.catch (reject);
			}
		return this;
		}
	update (filter) {
		this.action = "update";
		this.filter = filter || {}
		this.promise = function (resolve, reject) {
			if (typeof this.db.filter === "string") this.db.filter = {_id: Function.db.mongo.object.id (this.db.filter)}
			else if (this.db.filter instanceof Function.db.mongo.adapter.ObjectId) this.db.filter = {_id: this.db.filter}
			// else for (var i in this.db.filter) if (i.startsWith ("$")) if (this.db.filter [i.substr (1)] = Function.db.mongo.object.id (this.db.filter [i])) delete this.db.filter [i];
			var db;
			var $set = {}
			var $push = {}
			for (var i in this.db.data) {
				if (i === "$push") for (var x in this.db.data [i]) $push [x] = this.db.data [i][x];
				else $set [i] = this.db.data [i];
				}
			if (this.db.prop.one) db = this.db.adapter.updateOne (this.db.filter, {$set: {... $set, "_stamp.update": Date.now ()}, $push}, {upsert: false}).then (function (db) { resolve ({count: db.modifiedCount}); });
			else db = this.db.adapter.updateMany (this.db.filter, {$set, $push}).then (function (db) { resolve ({count: db.modifiedCount}); });
			db.catch (reject);
			}
		return this;
		}
	delete (filter) {
		this.action = "delete";
		this.filter = filter || {}
		this.promise = function (resolve, reject) {
			if (typeof this.db.filter === "string") this.db.filter = {_id: Function.db.mongo.object.id (this.db.filter)}
			else if (this.db.filter instanceof Function.db.mongo.adapter.ObjectId) this.db.filter = {_id: this.db.filter}
			// else for (var i in this.db.filter) if (i.startsWith ("$")) if (this.db.filter [i.substr (1)] = Function.db.mongo.object.id (this.db.filter [i])) delete this.db.filter [i];
			var db;
			if (this.db.prop.one) db = this.db.adapter.deleteOne (this.db.filter).then (function (db) { resolve ({count: db.deletedCount}); });
			else db = this.db.adapter.deleteMany (this.db.filter).then (function (db) { resolve ({count: db.deletedCount}); });
			db.catch (reject);
			}
		return this;
		}
	trash (filter) {
		this.action = "trash";
		this.filter = filter || {}
		this.promise = function (resolve, reject) {
			if (typeof this.db.filter === "string") this.db.filter = {_id: Function.db.mongo.object.id (this.db.filter)}
			// else for (var i in this.db.filter) if (i.startsWith ("$")) if (this.db.filter [i.substr (1)] = Function.db.mongo.object.id (this.db.filter [i])) delete this.db.filter [i];
			var db;
			if (this.db.prop.one) db = this.db.adapter.updateOne (this.db.filter, {$set: {"_stamp.delete": Date.now ()}}, {upsert: false}).then (function (db) { resolve ({count: db.modifiedCount}); });
			else db = this.db.adapter.updateMany (this.db.filter, {$set: {"_stamp.delete": Date.now ()}}).then (function (db) { resolve ({count: db.modifiedCount}); });
			db.catch (reject);
			}
		return this;
		}
	count (filter) {
		this.promise = function (resolve, reject) {
			if (typeof this.db.filter === "string") this.db.filter = {_id: Function.db.mongo.object.id (this.db.filter)}
			// else for (var i in this.db.filter) if (i.startsWith ("$")) if (this.db.filter [i.substr (1)] = Function.db.mongo.object.id (this.db.filter [i])) delete this.db.filter [i];
			var db = this.db.adapter.countDocuments (this.db.filter).then (function (db) { resolve (db); });
			db.catch (reject);
			}
		return this;
		}
	execute (context) {
		this.start ();
		return this.query = new Promise.io (this.promise.bind ({db: this, context}));
		}
	set (data) { this.data = data; return this; }
	one (one) { this.prop.one = one; return this; }
	sort (sort) { this.prop.sort = sort; return this; }
	skip (skip) { this.prop.skip = skip; return this; }
	limit (limit) { this.prop.limit = limit; return this; }
	offset () {}
	join (collection, field, output) {
		collection = Function.db.table (Function.db.collection (collection));
		field = field || "reference";
		output = output || "output";
		if (this.prop.join) this.prop.join.push ({collection, field, output});
		else this.prop.join = [{collection, field, output}];
		return this;
		}
	}

Function.db.mongo.collection.index = class {
	constructor (mongo, db, collection) {
		this.mongo = mongo;
		this.db = db;
		this.collection = collection;
		}
	create (index) {
		if (["_random_point"].includes (index)) index = {_random_point: "2d"}
		var promise = function (resolve, reject) {
			this.db.collection.adapter.createIndex (index).then (resolve).catch (reject);
			}
		return new Promise.io (promise.bind ({db: this}));
		}
	}

Function.db.mongo.collection.view = class {
	constructor (mongo, db, collection) {
		this.mongo = mongo;
		this.db = db;
		if (collection.startsWith ("view:")) collection = collection.split (":").join ("_");
		else collection = ["table", collection].join ("_");
		this.collection = collection;
		this.prop = {}
		this.index = new Function.db.mongo.collection.index (this.mongo, this.db, this);
		}
	}

Function.db.mongo.object = function () {}
Function.db.mongo.object.id = function (... id) { try { return new Function.db.mongo.adapter.ObjectId (... id); } catch (error) {} }
Function.db.mongo.object.rand = function (input) { return input || [Math.random (), 0]; }

/**
 * db : maria
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.db.maria = class {
	constructor (config) {
		this.link = Function.db.maria.adapter.createConnection (this.config = config);
		}
	use (database) {
		return new Function.db.maria.use (this, (database || this.config.database));
		}
	query (sql) {
		return new Promise.io (Function.db.maria.result (this.link, Function.db.maria.sql (sql, this.config.database)));
		}
	execute (sql, value) {
		return new Promise.io (Function.db.maria.result (this.link, Function.db.maria.sql (sql, this.config.database), value));
		}
	collection (table) {
		return new Function.db.maria.collection (this, this.config.database, table);
		}
	on (key, value) {
		this.link.addListener (key, value);
		}
	}

Function.db.maria.use = class {
	constructor (maria, database) {
		this.maria = maria;
		this.database = database;
		}
	query (sql) {
		return new Promise.io (Function.db.maria.result (this.maria.link, Function.db.maria.sql (sql, this.database)));
		}
	execute (sql, value) {
		return new Promise.io (Function.db.maria.result (this.maria.link, Function.db.maria.sql (sql, this.database), value));
		}
	collection (table) {
		return new Function.db.maria.collection (this.maria, this.database, table);
		}
	}

Function.db.maria.collection = class {
	constructor (maria, database, table) {
		this.maria = maria;
		this.database = database;
		this.table = table;
		}
	select (where, data) {
		this.data = [];
		if (where) for (var i in where) this.data.push (where [i]), where [i] = "?";
		if (data) this.data.push (... data);
		var sql = "select * from `db`.`table`" + Function.db.maria.sql.where (where);
		this.sql = Function.db.maria.sql (sql, this.database, this.table);
		return this;
		}
	insert (field, ... data) {
		if (Array.isArray (field)) {}
		else { var key = [], value = []; for (var i in field) key.push (i), value.push (field [i]); field = key, data = [value]; }
		var sql = "insert into `db`.`table` (`$:field`) values `$:value`";
		this.sql = Function.db.maria.sql (sql, this.database, this.table, this.action = "insert", field, (this.data = data));
		return this;
		}
	update (field, where, data) {
		var key = [], value = [];
		for (var i in field) key.push (i), value.push (field [i]);
		field = key, this.data = value;
		if (where) for (var i in where) this.data.push (where [i]), where [i] = "?";
		if (data) this.data.push (... data);
		var sql = "update `db`.`table` set `$:set`" + Function.db.maria.sql.where (where);
		this.sql = Function.db.maria.sql (sql, this.database, this.table, this.action = "update", field);
		return this;
		}
	delete (where, data) {
		this.data = [];
		if (where) for (var i in where) this.data.push (where [i]), where [i] = "?";
		if (data) this.data.push (... data);
		var sql = "delete from `db`.`table`" + Function.db.maria.sql.where (where);
		this.sql = Function.db.maria.sql (sql, this.database, this.table);
		return this;
		}
	query () {
		return this.promise = new Promise.io (Function.db.maria.result (this.maria.link, this.sql));
		}
	execute () {
		return this.promise = new Promise.io (Function.db.maria.result (this.maria.link, this.sql, this.data));
		}
	}

Function.db.maria.result = function (link, sql, value) {
	return function (resolve, reject) {
		var context = function (error, data, field) {
			if (error) reject (error);
			else {
				if (data.insertId) data.id = data.insertId;
				if (data.affectedRows) data.count = data.affectedRows;
				resolve ({data, field});
				}
			}
		if (value) link.execute (sql, value.flat (), context);
		else link.query (sql, context);
		}
	}

Function.db.maria.sql = function (query, database, table, action, field, value) {
	var sql;
	if (database) {
		sql = query.split ("`db`").join ("`" + database + "`");
		if (table) sql = sql.split ("`table`").join ("`" + table + "`");
		if (action === "insert") {
			if (field) {
				var column = [];
				var statement = [];
				for (var i in field) if (column.push ("`" + field [i] + "`")) statement.push ("?");
				sql = sql.split ("`$:field`").join (column.join (", "));
				if (value) {
					var prepare = [];
					for (var i in value) prepare.push ("(" + statement.join (", ") + ")");
					sql = sql.split ("`$:value`").join (prepare.join (", "));
					}
				}
			}
		if (action === "update") {
			if (field) {
				var set = [];
				for (var i in field) set.push ("`" + field [i] + "` = ?");
				sql = sql.split ("`$:set`").join (set.join (", "));
				}
			}
		}
	else sql = "`" + query + "`";
	return sql;
	}

Function.db.maria.sql.where = function (where) {
	var sql = [];
	for (var i in where) {
		var key = Function.db.maria.sql (i);
		var value = where [i];
		if (value !== "?") if (typeof value === "string") value = "'" + value + "'";
		sql.push ([key, value].join (" = "));
		}
	if (sql.length) return " where " + sql.join (" and ");
	else return "";
	}

/**
 * web
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.web = function () {}
Function.web.site = function () {}
Function.web.socket = function () {}

/**
 * socket
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.socket = function (server, option) { return Function.socket.adapter (server, {cors: {origin: "*"}}); }
Function.socket.require = function () { return Function.browser.socket = require ("socket.io-client"); }

Function.socket.io = class {
	constructor (io) {
		this.io = io;
		}
	start (host) {
		if (host) this.host = host;
		if (this.host) {
			if (this.host === (this.header = this.io.handshake.headers).host)
			if (this.header.origin)
			if (this.id = this.io.id)
			this.client = URL.parse_url (this.header.origin);
			}
		return this;
		}
	inject (app) {
		this.__app = app;
		return this;
		}
	use (context) {
		if (typeof context === "string") this.host = context;
		else return context (this.__app, this);
		return this;
		}
	on (key, value) {
		if (["connect", "start"].includes (key)) value ();
		else if (key === "close") this.io.on ("disconnect", value);
		else this.io.on (key, Function.socket.io.on (this, key, value));
		return this;
		}
	emit (key, value) {
		this.io.emit (key, value);
		return this;
		}
	}

Function.socket.io.on = function (socket, key, value) {
	return function (data) {
		if (data) {
			if (data.id) {
				data.string = "";
				data.array = [];
				data.object = {}
				if (data.data) {
					if (typeof data.data === "string") data.string = data.data;
					else if (Array.isArray (data.data)) data.array = data.data;
					else data.object = data.data;
					delete data.data;
					}
				if (socket.client) {
					var response = function (i, o) {
						if (arguments.length > 1) socket.emit (i, {id: data.id, key: i, data: o});
						else socket.emit (key, {id: data.id, key, data: i});
						}
					response.broadcast = function (i, o) {
						if (arguments.length > 1) socket.broadcast.emit (i, {id: data.id, data: o});
						else socket.broadcast.emit (key, {id: data.id, data: i});
						}
					response.error = function (error) {
						response ({error});
						}
					response.error.status = function (error) {
						response ({error: Function.header.status (error)});
						}
					value (data, response);
					}
				else socket.emit ("error", {message: "client not found"});
				}
			else socket.emit ("error", {message: "id not set"});
			}
		else socket.emit ("error");
		}
	}

Function.socket.io.header = function (header) {
	return {extraHeaders: header}
	}

/**
 * path
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.path = function () {}
Function.path.require = function () { Function.path.adapter = require ("node:path"); Function.path.separator (Function.path.adapter.sep); return Function.path.adapter; }
Function.path.separator = function (path) { if (path) Function.path.separator.value = path; return Function.path.separator.value; }
Function.path.join = function (... path) { return Function.path.adapter.join (... path); }

Function.path.regex = function () {}
Function.path.regex.require = function () { return Function.path.regex.adapter = require ("path-to-regexp"); }

/**
 * file
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.file = function () {}
Function.file.require = function () { return Function.file.adapter = require ("node:fs"); }

Define (Function.file, "name", function (file) { return file.split ("/").end (); });
Function.file.exist = function (file) { return Function.file.adapter.existsSync (file); }
Function.file.get = function () {}
Function.file.get.content = function (file) { return Function.file.adapter.readFileSync (file).toString (); }
Function.file.put = function () {}
Function.file.put.content = function (file, data, option) { return Function.file.adapter.writeFileSync (file, data, option); }

Function.file.extension = function () {}
Function.file.extension.html = function (file) { if (file) return file.concat (Function.file.extension.html ()); else return ".html"; }
Function.file.extension.css = function (file) { if (file) return file.concat (Function.file.extension.css ()); else return ".css"; }
Function.file.extension.js = function (file) { if (file) return file.concat (Function.file.extension.js ()); else return ".js"; }
Function.file.extension.json = function (file) { if (file) return file.concat (Function.file.extension.json ()); else return ".json"; }
Function.file.extension.xml = function (file) { if (file) return file.concat (Function.file.extension.xml ()); else return ".xml"; }
Function.file.extension.ini = function (file) { if (file) return file.concat (Function.file.extension.ini ()); else return ".ini"; }
Function.file.extension.image = {
	gif: ".gif",
	png: ".png",
	jpg: ".jpg",
	jpeg: ".jpeg",
	}

Function.file.json = class {
	constructor (file) {
		this.file = file;
		try {
			if (Function.file.exist (this.file)) this.load ();
			else Function.file.put.content (this.file, JSON.stringify.pretty (this.data = {}));
			}
		catch (error) { this.error = error; }
		}
	load () {
		this.data = Function.file.get.content (this.file).json ();
		return this;
		}
	get (key) {
		if (key) return this.data [key];
		else return this.data;
		}
	set (key, value) {
		if (arguments.length > 1) this.data [key] = value;
		else for (var i in key) this.data [i] = key [i];
		return this;
		}
	delete (key) {
		delete this.data [key];
		return this;
		}
	save () {
		var data = JSON.stringify (this.data, ... JSON.pretty);
		Function.file.put.content (this.file, data);
		return this;
		}
	}

/**
 * dir
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.dir = function () {}
Function.dir.exist = function (dir) { return Function.file.adapter.existsSync (dir); }
Function.dir.create = function (dir, option) { return Function.file.adapter.mkdirSync (dir, option); }

/**
 * ip
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.ip = function (ip = "auto") {
	if (ip === "auto") return new Promise.io (function (resolve, reject) {
		var trace = URL.get (Function.ip.trace.base_url).then (function (response) {
			resolve (Function.ip.info (response.data));
			});
		trace.catch (reject);
		});
	}

Function.ip.info = function (trace) {
	var result = {ip: {address: trace.ip, version: (trace.version === "IPv4" ? 4 : 6)}}
	result.continent =  {
		"*": trace.in_eu ? "europe" : Function.geo.continent (trace.country_code) || "unknown",
		america: Function.geo.continent (trace.country_code) === "america" || false,
		europe: Function.geo.continent (trace.country_code) === "europe" || trace.in_eu,
		asia: Function.geo.continent (trace.country_code) === "asia" || false,
		africa: Function.geo.continent (trace.country_code) === "africa" || false,
		australia: Function.geo.continent (trace.country_code) === "australia" || false,
		antarctica: Function.geo.continent (trace.country_code) === "antarctica" || false,
		}
	result.country = Function.geo.country.data [trace.country_code] || {
		code: trace.country_code, iso: trace.country_code_iso3,
		name: trace.country_name, capital: trace.country_capital,
		phone: trace.country_calling_code, area: trace.country_area,
		population: trace.country_population,
		region: {
			code: trace.region_code, name: trace.region,
			city: {code: "XX", name: trace.city},
			},
		}
	result.currency = {code: trace.currency, name: trace.currency_name}
	result.coordinate = {
		latitude: trace.latitude,
		longitude: trace.longitude,
		}
	return result;
	}

Function.ip.reserve = function (ip) {
	if (ip === "local") return "127.0.0.1";
	else if (ip === "sub") return "255.255.255.0";
	else return "0.0.0.0";
	}

Function.ip.trace = function () {}
Function.ip.trace.base_url = "https://ipapi.co/json/";
Function.ip.trace.url = "https://ipapi.co/%s/json/";
Function.ip.url = "https://api.ipify.org/?format=json";

Function.geo = function () {}

Function.geo.continent = function (continent) {
	for (var i in Function.geo.continent.data) {
		if (Function.geo.continent.data [i].includes (continent)) return i;
		}
	}
Function.geo.continent.data = {
	america: [],
	europe: [],
	asia: ["ID", "MY", "SG", "CN", "KR", "JP"],
	africa: [],
	australia: [],
	antarctica: [],
	}

Function.geo.country = function () {}
Function.geo.country.data = {}

/**
 * storage
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.storage = class {
	constructor () {}
	static clear () { localStorage.clear (); }
	static delete (key) { localStorage.removeItem (key); }
	static set (key, value) {
		localStorage.setItem (key, Function.storage.convert (value));
		return value;
		}
	static get (key) {
		if (key) return Function.storage.convert (localStorage.getItem (key));
		else return localStorage;
		}
	static json (key, value) {
		if (arguments.length > 1) localStorage.setItem (key, JSON.stringify (value));
		else value = JSON.parse (Function.storage.convert (localStorage.getItem (key)));
		return value;
		}
	static exist (key) {
		return key in localStorage;
		}
	}

Function.storage.convert = function (value) {
	if (null) null;
	else if (value === "null") return null;
	else if (value === "true") return true;
	else if (value === "false") return false;
	else if (value === "undefined") return undefined;
	else if (value === null) return "null";
	else if (value === true) return "true";
	else if (value === false) return "false";
	else if (value === undefined) return "undefined";
	else return value;
	}

Function.cookie = class {
	constructor (cookie) { this.cookie = cookie; }
	config (... option) { return this.cookie.config (... option); }
	set (key, value, ... option) { return this.cookie.set (this.key (key), value, ... option); }
	get (key) { if (key) return this.cookie.get (this.key (key)); else { var data = {}, cookie = this.key (); for (var i in cookie) data [cookie [i]] = this.cookie.get (this.key (cookie [i])); return data; } }
	delete (key) { if (key) return this.cookie.remove (this.key (key)); else { var data = {}, cookie = this.key (); for (var i in cookie) data [cookie [i]] = this.cookie.remove (this.key (cookie [i])); } }
	exist (key) { return this.cookie.isKey (this.key (key)); }
	key (key) { if (key) return key.split (":").join ("_").split (".").join ("_").split (" ").join ("_"); else return this.cookie.keys (); }
	register (key, value, context, ... option) {
		if (this.exist (key) === false) {
			if (context) context (this);
			return this.set (key, value, ... option);
			}
		}
	}

Function.cookie.path = "/";

/**
 * dom
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.dom = function (dom) { return new Function.dom.document ($ (dom)); }
Function.dom.document = class {
	constructor (dom) { this.dom = dom; }
	attribute (... attribute) { return this.dom.attr (... attribute); }
	}

/**
 * plugin
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.plugin = function () {}

Function.android = function () {}
Function.flutter = function () {}

/**
 * plugin : variable
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.reference = function () {}
Function.reference.set = function (reference) { return Function.reference.proxy = reference; }
Function.reference.build = function (reference, value, values = function () {}) {
	if (value === Function.reference.proxy) return reference;
	else if (value === undefined) if (reference.value === undefined) values (); else return reference.value;
	else return reference.value = value;
	}

/**
 * plugin : firebase
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.firebase = function () {}
Function.firebase.auth = function () {}
Function.firebase.auth.provider = function (credential) { if (credential) if (credential.user) if (credential.user.providerId === "firebase") return true; }

/**
 * plugin : owl
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.owl = function (element, option) { return $ (element).owlCarousel (option); }
Function.owl.carousel = function (element, option) { $ (element).owlCarousel (option); }
Function.owl.carousel.slide = function (option) {
	return new Promise.io (function (resolve, reject) {
		setTimeout (function () {
			var element = {id: ("#").concat (option.id), container: ("#").concat (option.container || "container")}
			var item = parseInt (option.item || 5);
			var gap = parseInt (option.gap || 10);
			var margin = parseInt (option.margin || 0);
			var container = $ (element.container);
			$ (element.id).width ((container.width () - margin) + "px");
			Function.owl.carousel (element.id, {
				loop: true,
				dots: option.dot || false,
				autoplay: true,
				autoplayHoverPause: true,
				margin: gap,
				items: item,
				});
			resolve (true);
			}, 3000);
		});
	}

/**
 * browser
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.browser = function () {}
Function.browser.agent = function () {
	var agent;
	if (Function.browser.agent.navigator) {}
	else {
		Function.browser.agent.navigator = window.navigator.userAgent;
		Function.browser.agent.cookie = window.navigator.cookieEnabled;
		}
	if (agent = Function.browser.agent.navigator.toLowerCase ()) {
		var device = {}
		if (agent.includes ("mobile") || agent.includes ("android") || agent.includes ("iphone") || agent.includes ("ipad")) device.type = "mobile";
		else device.type = "computer";
		if (agent.includes ("android")) device.platform = "google";
		else if (agent.includes ("mac")) device.platform = "apple";
		else device.platform = "microsoft";
		if (device.type === "mobile") if (window.innerWidth > 600) device.model = "tablet";
		else device.model = "phone";
		var browser = {cookie: Function.browser.agent.cookie}
		if (agent.includes ("firefox")) browser.platform = "mozilla";
		else if (agent.includes ("chrome")) browser.platform = "chrome";
		else if (agent.includes ("opera")) browser.platform = "opera";
		else if (agent.includes ("safari")) browser.platform = "safari";
		else browser.platform = "*";
		if (agent.includes ("wv")) browser.model = "web-view";
		return {device, browser}
		}
	}

Function.window = function () {}
Function.document = function () {
	document.scroll = function () {}
	document.scroll.smooth = function (id) { return document.getElementById (id || "body").scrollIntoView ({behavior: "smooth"}); }
	document.size = function () { return {width: window.innerWidth, height: window.innerHeight} }
	document.reload = function () { window.location.reload (); }
	document.on = function (key, value) {
		if (key === "scroll") window.onscroll = value;
		if (["resize", "re:size", "size:change", "size change"].includes (key)) window.onresize = value;
		}
	document.watch = function () {
		document.parse_url = URL.parse_url (document.base_url = window.location.href.toString ());
		document.parse_url.uri = window.location.pathname + window.location.search;
		}
	}

/**
 * url
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

URL.require = function (adapter) {
	if (adapter === Function.browser || adapter === "axios") URL.axios = require ("axios");
	else {
		URL.adapter = require ("axios");
		URL.http.adapter = require ("node:http");
		}
	}

URL.get = function (url, option) { return new URL.axios (url, {method: "get", ... option}); }
URL.post = function (url, data, option) { return new URL.axios (url, {method: "post", data, ... option}); }

URL.external = function (url) {
	if (typeof url === "string") return url.startsWith ("http://") || url.startsWith ("https://");
	}

URL.parse_url = function parse_url (url, option = {}) {
	try {
		var parse = new URL (url);
		var parse_url = {
			reference: parse.href,
			referer: "",
			protocol: parse.protocol.substr (0, parse.protocol.length - 1) || option.protocol,
			host: {reference: "", address: parse.host, name: parse.hostname, cookie: parse.hostname, port: parse.port},
			domain: URL.domain.parse (parse.hostname),
			user: parse.username, password: parse.password,
			path: parse.pathname || "/",
			query: {},
			tag: parse.hash,
			}
		if (parse_url.domain.sub === "www") parse_url.domain.address = parse_url.domain.name;
		else parse_url.domain.address = [parse_url.domain.sub, parse_url.domain.name].join (".");
		if (parse.search) for (var [key, value] of parse.searchParams.entries ()) parse_url.query [key] = value;
		if (parse_url.domain.name) parse_url.host.cookie = (".") + parse_url.domain.name;
		parse_url ["*"] = parse_url.domain.name || parse_url.host.name;
		return parse_url;
		}
	catch (error) {
		if (option.retry) {}
		else if (option.retry = true) return URL.parse_url (((option.protocol || "http") + "://" + url), option);
		}
	}

URL.domain = function (data) {
	if (data) URL.domain.extension = URL.domain.sort (data);
	}

URL.domain.parse = function (host) {
	for (var i in URL.domain.extension) {
		if (host.endsWith (URL.domain.extension [i])) {
			var n = host.substr (0, (host.length - URL.domain.extension [i].length));
			var name = n.split (".").end ();
			var sub = n.substr (0, (n.length - (name.length + 1))), substitute = false;
			if (sub) {}
			else { sub = "www"; substitute = true; }
			var extension = URL.domain.extension [i];
			return {name: name.concat (extension), base: {name}, extension, sub, substitute, reference: sub.split (".").reverse ().join (".")}
			break;
			}
		}
	return {name: "", base: {name: ""}, extension: "", sub: "www", substitute: false, reference: ""}
	}

URL.domain.sort = function (domain) {
	var extension = [], sub = [];
	for (var i in domain) if (domain [i].split (".").length > 2) sub.push (domain [i]);
	else extension.push (domain [i]);
	return [... sub, ... extension];
	}

URL.domain.extension = URL.domain.sort ([
	".com", ".net", ".org", ".info", ".biz", ".tv", ".co",
	".io", ".app", ".site", ".blog", ".cloud", ".space", ".pro", ".ninja", ".life", ".live", ".online",
	".id", ".my", ".us", ".cn", ".kr", ".jp",
	".xxx", ".xyz",
	".co.id", ".co.uk", ".co.kr", ".co.jp", ".com.my",
	".local", ".ng", ".express", ".vue", ".tmp",
	]);

/**
 * http
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

URL.http = function () {}
URL.http.require = function () { if (URL.http.adapter) return URL.http.adapter; else return URL.http.adapter = require ("node:http"); }
URL.http.server = function (server) { return URL.http.adapter.createServer (server); }

/**
 * json
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

JSON.pretty = [null, 4];
JSON.stringify.pretty = function (json) { return JSON.stringify (json, ... JSON.pretty); }

/**
 * regex
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

RegExp.__ = function () {}

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

Function.snippet = function () {}

Function.snippet.router = {}
Function.snippet.router.script = "Object.router={\"regex\":%s,\"static\":%s};";

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/*
Function.window = function () {
	window.scroll = function () {}
	window.scroll.smooth = function (id) { return document.getElementById (id || "body").scrollIntoView ({behavior: "smooth"}); }
	window.size = function () { return {width: window.innerWidth, height: window.innerHeight} }
	window.on = function (key, value) {
		if (key === "scroll") window.onscroll = value;
		if (["resize", "re:size", "size:change", "size change"].includes (key)) window.onresize = value;
		}
	window.agent = function () {
		var agent = window.navigator.userAgent.toLowerCase ();
		if (agent) {
			var device = {}
			if (agent.includes ("mobile") || agent.includes ("android") || agent.includes ("iphone") || agent.includes ("ipad")) device.type = "mobile";
			else device.type = "computer";
			if (agent.includes ("android")) device.platform = "google";
			else if (agent.includes ("mac")) device.platform = "apple";
			else device.platform = "microsoft";
			if (device.type === "mobile") if (window.innerWidth > 600) device.model = "tablet";
			else device.model = "phone";
			var browser = {cookie: window.navigator.cookieEnabled}
			if (agent.includes ("firefox")) browser.platform = "mozilla";
			else if (agent.includes ("chrome")) browser.platform = "chrome";
			else if (agent.includes ("opera")) browser.platform = "opera";
			else if (agent.includes ("safari")) browser.platform = "safari";
			else browser.platform = "*";
			if (agent.includes ("wv")) browser.model = "web-view";
			return {device, browser}
			}
		}
	window.agent.navigator = window.navigator.userAgent;
	window.watch = function () {
		window.base_url = window.location.href.toString ();
		window.parse_url = URL.parse_url (window.base_url);
		window.location.uri = window.location.pathname + window.location.search;
		}
	}
*/
