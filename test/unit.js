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
		"dustc": "dustjs-require"
	}
});


module.exports = {
	nonOptimized: {
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
				test.equals('<p id="test">Hello, World!</p>', out);
				test.expect(2);
				test.done();
			});
		}
	},
	optimized: {
		setUp: function(cb){
			var that = this;

			if ( fs.existsSync(testBuildPath) ) {
				fs.unlinkSync(testBuildPath);
			}

			requirejs.optimize({
				baseUrl: basePath,
				name: "test/main",
				optimize: 'none',
				paths: {
					"dustjs-linkedin": "node_modules/dustjs-linkedin/dist/dust-full-2.2.2",
					"dustc": "dustjs-require"
				},
				out: testBuildPath
			}, function (buildResponse) {
					that.buildResponse = buildResponse;
					console.log(buildResponse);
					cb();
			}, function(err) {
					that.error = err;
					console.error(err);
			    cb();
			});
		},
		build: function(test){
			var contents = fs.readFileSync(testBuildPath, 'utf8');
			test.ok(this.buildResponse);
			test.ok(contents);
			test.expect(2);
			test.done();
		}
	}
};