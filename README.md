# dustjs-require

A requirejs plugin that loads dustjs templates and compiles them. This lets you use dustjs templates in your AMD application via:

	define(
		[
			'dustjs-linkedin',
			'dust!path/to/my/template/partial.dust'
		], 
		function(dust, tplName){
			dust.render(tplName, {}, function(err, out){
				// do something with your rendered template...
			});
		});

## Configuration

The dust template file extension is now detected automattically(thanks, @clmsnskr).You must specify the path to this plugin:
	
	require.config({
		paths: {
		    dust: 'path/to/this/plugin/dustjs-require'
		}
	});

## Usage

Include your dustjs templates in your AMD module like you would with the text! plugin:

	define(['dust!path/to/your/template/partial.dust'])

You can configure the plugin to use your own extension from the config section above. The plugin will load the template, compile it, store it in dust.cache as:
	
	dust.cache['path/to/your/template/partial']

 , and return the template name to your AMD module. Then you can render your templates via dust.render:
	
	define(
		[
			'dustjs-linkedin',
			'dust!path/to/my/template/partial.dust'
		], 
		function(dust, tplName){
			dust.render(tplName, {}, function(err, out){
				// do something with your rendered template...
			});
		});
