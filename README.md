# dustjs-require

A requirejs plugin that loads dustjs templates and compiles them. This lets you use dustjs templates in your AMD application like so:

	define(
	  [
	    'dustjs-linkedin',
	    'dustc!path/to/my/template/partial.dust'
	  ],
	  function(dust, tplName){
	    dust.render(tplName, {}, function(err, out){
	    // do something with your rendered template...
	  });
	});

## Configuration

The dust template file extension is now detected automattically(thanks, @clmsnskr).You must specify the path to this plugin and provide the path to dustjs. You may optionally specify a module name for dustjs:

	require.config({
	  config: {
	    'dustc': {
	      dustModule: 'dustjs-linkedin' // optional, defaults to "dustjs-linkedin"
	    }
	  },
	  paths: {
	    'dustc': 'path/to/this/plugin/dustjs-require',
	    'dustjs-linkedin': 'path/to/dustjs-linkedin/dist/dust-full-2.2.2'
	  }
	});

## Usage

Include your dustjs templates in your AMD module like you would with the text! plugin:

	define(['dustc!path/to/your/template/partial.dust'])

The plugin will load the template, compile it, store it in dust.cache as:

	dust.cache['path/to/your/template/partial']

 , and return the template name to your AMD module. Then you can easily render your templates via dust.render:

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

This plugin will also work with the r.js optimizer(!).
