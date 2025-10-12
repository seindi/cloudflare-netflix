function body_css () {
	var type = "phone";
	var orientation = "portrait";
	var body = $ ("body").innerWidth ();
	if (body > 600) type = "phone";
	if (body > 1000) type = "computer";
	if ($ ("body").width () > $ ("body").height ()) orientation = "landscape";
	$ ("body").removeClass ("computer mobile tablet phone");
	$ ("body").addClass ($__ ["page:is"]).addClass (type).addClass (orientation);
	}