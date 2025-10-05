import php, {express} from "../zend/engine";

const prefix_url : any = {
	"movie:discover": "https://api.themoviedb.org/3/discover/movie",
	"movie:popular": "https://api.themoviedb.org/3/movie/popular",
	"image:original": "https://image.tmdb.org/t/p/original",
	"image:medium": "https://image.tmdb.org/t/p/w500",
	}

php.plugin.TMDB = class {
	__GET: any;
	__POST: any;
	api: string;
	movie: any
	tv: any
	constructor (api: string) {
		this.api = api;
		this.__GET = {method: "GET", headers: new Headers ({Accept: "application/json"})}
		this.__POST = {method: "GET", headers: new Headers ({Accept: "application/json"})}
		this.movie = new php.plugin.TMDB.movie (this);
		}
	url (url: string, option: any) {
		var url = [url, ("api_key={api_key}").to_format ("{api_key}", this.api)].join ("?");
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
		var data = await fetch (url, this.adapter.__GET);
		return data.json ();
		}
	}

php.plugin.TMDB.image = function () {}
php.plugin.TMDB.image.src = function (path: string, size: string = "original") { return prefix_url [["image", size].join (":")] + path; }
