import php from "../../zend/engine";
import __config from "../../application/config.json";

var the_menu_1_markup = "";
var the_menu_1 = [
	{title: "", icon: "home"},
	];
for (var i in the_menu_1) {
	//
	}

var the_menu_2_markup : any = [];
var the_menu_2 = [
	{title: "History", icon: "search_activity"},
	{title: "Watch Later", icon: "timer_play"},
	{title: "Playlist", icon: "playlist_play"},
	];
the_menu_2_markup.push (`<ul>`);
for (var i in the_menu_2) {
	the_menu_2_markup.push (`<li><a class="a-menu-1" href="#"><div class="icon:container font-size:medium"><span class="icon:material">${the_menu_2 [i].icon}</span></div><span class="string">${the_menu_2 [i].title}</span></a></li>`);
	}
the_menu_2_markup.push (`</ul>`);
the_menu_2_markup = the_menu_2_markup.join ("\n");

var theme = {
	layout: {
		"base": [
			`<div id="wrap">`,
			`	<div id="wrapper">`,
			`		<div id="container">`,
			`{{ body }}`,
			`		</div>`,
			`	</div>`,
			`</div>`,
			`<script src="${php.theme_uri ('scripted.js')}"></script>`,
			],
		"index": [
			`<div id="app" class="flex flex-row match_parent">`,
			`	<header style="background: #f1f1f1">`,
			`		header`,
			`	</header>`,
			`	<div id="body" class="flex flex-grow">`,
			`		<menu id="menu" class="flex flex-row fixed v-scroll" style="background: #cccccc; height: calc(100% - 50px);">`,
			`
						<div>
							<div>asd</div>
						</div>
						<div>
							<div>YOU</div>
							${the_menu_2_markup}
						</div>
						<div>
							xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>xxx<BR>
						</div>
			`,
			`		</menu>`,
			`		<main class="flex-grow" style="background: #eeeeee">{{ main }}</main>`,
			`		<section style="background: #dddddd">section</section>`,
			`	</div>`,
			`	<footer style="background: #aaaaaa">`,
			`		footer`,
			`	</footer>`,
			`</div>`,
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