import php from "../../zend/engine";
import config from "../../application/config.json"

var theme = {
	layout: {
		"base": [
			`<div id="wrap">`,
			`	<div id="wrapper">`,
			`		<div id="container">`,
			`			<div id="app">`,
			`{{ body }}`,
			`			</div>`,
			`		</div>`,
			`	</div>`,
			`</div>`,
			`<script src="${php.theme_uri ('scripted.js')}"></script>`,
			],
		"index": [
			`<header>header</header>`,
			`<menu>menu</menu>`,
			`<main>{{ main }}</main>`,
			`<section>section</section>`,
			`<footer>footer</footer>`,
			],
		},
	component: {
		"video-card:container": `<div class="video-card flex">{{ body }}</div>`,
		"video-card": `<div class="video-card:single border-radius">
				<img src="{{ poster }}" height="150" class="border-radius">
			</div>`,
		},
	}

export default theme;