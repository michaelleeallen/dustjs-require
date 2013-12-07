require([
		"dustjs-linkedin",
		"dustc!test/partial.dust"
	],
	function(dust, tpl){
		dust.render(tpl, {name: "World"}, function(err, out){
			console.log(err || out);
		});
	});