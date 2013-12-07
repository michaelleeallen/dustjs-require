var tplPath = 'test/partial';
var fs = require('fs');
var requirejs = require('requirejs');
var path = require('path');
var basePath = path.resolve(__dirname, '../');
var testBuildPath = path.join(__dirname, "main-built.js");


requirejs.config({
	baseUrl: basePath,
	nodeRequire: require,
	paths: {
		"dustc": "dustjs-require",
		"text": "vendor/requirejs-text/text",
		"q": "vendor/q/q"
	}
});


module.exports = {
	setUp: function(cb){
		var that = this;

		requirejs([
			'dustjs-linkedin',
			'dustc!test/partial.dust'
		], function(dust, tpl){
			that.template = tpl;
			that.dust = dust;
			cb();
		});
	},
	load: function(test){
		test.ok(this.template);
		test.expect(1);
		test.done();
	},
	compile: function(test){
		test.ok(this.dust.cache);
		test.ok(this.dust.cache[tplPath]);
		test.expect(2);
		test.done();
	},
	render: function(test){
		this.dust.render(tplPath, {name:"World"}, function(err, out){
			test.ok(out);
			test.equals("<p>Hello, World!</p>", out);
			test.expect(2);
			test.done();
		});
	}
};