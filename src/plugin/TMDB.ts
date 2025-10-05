import php from "../zend/engine";

const prefix_url : any = {
	"movie:discover": "https://api.themoviedb.org/3/discover/movie",
	"movie:popular": "https://api.themoviedb.org/3/movie/popular",
	"image:default": "https://image.tmdb.org/t/p/w500",
	"image:original": "https://image.tmdb.org/t/p/original",
	}

php.plugin.TMDB = class {
	__GET: any;
	__POST: any;
	api: string;
	request: string;
	movie: any
	tv: any
	constructor (api: string, request: any) {
		this.api = api;
		this.request = request;
		this.__GET = {method: "GET", headers: new Headers ({Accept: "application/json"})}
		this.__POST = {method: "GET", headers: new Headers ({Accept: "application/json"})}
		this.movie = new php.plugin.TMDB.movie (this);
		}
	url (url: string, option: any) {
		var url = [url, ("api_key={api_key}").split ("{api_key}").join (this.api)].join ("?");
		option = option || {}
		option.page = option.page || 1;
		if  (option.page) url = [url, ["page", option.page].join ("=")].join ("&");
		if  (option.genre) url = [url, ["with_genres", option.genre].join ("=")].join ("&");
		return url;
		}
	}

php.plugin.TMDB.movie = class {
	adapter: any;
	constructor (adapter: any) {
		this.adapter = adapter;
		}
	async discover (option: any) {
		var url = this.adapter.url (prefix_url ["movie:discover"], option);
		var data = await fetch (url, this.adapter.__GET);
		return data.json ();
		}
	async popular (option: any) {
		var url = this.adapter.url (prefix_url ["movie:popular"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: movie_revamp (respond.results, adapter.request)});
			});
		}
	}

function to_slugify (input: string) {
	return input.toLocaleLowerCase ().split (" ").join ("-").split (":").join ("-").split ("--").join ("-");
	}

function movie_revamp (data: any, request: any) {
	return data.map (function (movie: any) {
		var slugify = to_slugify ([movie.id, movie.title].join ("-"));
		var poster = php.plugin.TMDB.image.src (movie.poster_path);
		var poster_original = php.plugin.TMDB.image.src (movie.poster_path, "original");
		var permalink = request.url.address + "/movie/" + slugify + "/";
		var permalink_watch = permalink + "/watch";
		return {
			id: movie.id,
			title: movie.title,
			slugify,
			permalink, permalink_watch,
			poster, poster_original,
			}
		});
	}

php.plugin.TMDB.image = function () {}
php.plugin.TMDB.image.src = function (path: string, size: string = "default") { return prefix_url [["image", size].join (":")] + path; }
