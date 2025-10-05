import php from "../zend/engine";

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
