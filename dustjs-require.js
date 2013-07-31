define(
	[
		'dustjs',
		'text'
	], 
	function(dust)
	{
		return {
			/**
			 *	Public:load
			 *	Implements the plugin API load method. We load our dust
			 *	partials via text! plugin, and then compile them using
			 *	dust. All templates will be stored in dust.cache[path].
			 *
			 *	@return String template name
			 */
			load: function(name, req, onload, config){
				req(['text!'+name], function(tpl){
					var path = name.slice(0, -(config.extension.length));
					dust.loadSource(dust.compile(tpl, path));
					onload(path);
				});
			}
		};
	});