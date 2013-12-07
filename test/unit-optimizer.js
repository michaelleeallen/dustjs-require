var fs = require('fs');
var requirejs = require('requirejs');
var path = require('path');
var basePath = path.resolve(__dirname, '../');
var testBuildPath = path.join(__dirname, "main-built.js");


module.exports = {
	setUp: function(cb){
		var that = this;
		requirejs.optimize({
			baseUrl: basePath,
			name: "test/main",
			optimize: 'none',
			paths: {
				"dustjs-linkedin": "node_modules/dustjs-linkedin/dist/dust-full-2.2.2",
				"dustc": "dustjs-require",
				"text": "vendor/requirejs-text/text",
				"q": "vendor/q/q"
			},
			out: testBuildPath
		}, function (buildResponse) {
				that.buildResponse = buildResponse;
				cb();
		}, function(err) {
				that.error = err;
		    cb();
		});
	},
	optimize: function(test){
		var contents = fs.readFileSync(testBuildPath, 'utf8');
		test.ok(this.buildResponse);
		test.ok(contents);
		test.expect(2);
		test.done();
	}
};