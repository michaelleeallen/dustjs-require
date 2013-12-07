define([
  'module',
  'text',
  'q'
],
  function(module, text, Q) {
    var dustModule = module.config().dustModule || 'dustjs-linkedin';
    var buildMap = {};
    /**
     * This little bit of hackery is required to make dustjs play nice with the
     * r.js optimizer, which, when loading the dustjs library, will bind the global "this" to
     * the node.js environment causing the dust compiler to error out. To avoid this, we do not
     * load dustjs as a dependency unless we are sure we are not running a build.
     * @private
     * @param {!object} req - the passed-in requirejs instance
     * @param {!boolean} isBuild - is this script being used from r.js optimizer?
     * @returns {Promise}
     */
    var getDust = function(req, isBuild){
      var d = Q.defer();
      if (!isBuild) {
        req([dustModule], function(dst){
          d.resolve(dst);
        });
      } else {
        d.resolve({});
      }
      return d.promise;
    };

    return {
      /**
       *  Implements the plugin API load method. We load our dust
       *  partials via text! plugin, and then compile them using
       *  dust. All templates will be stored in dust.cache[path].
       *
       *  @returns {string} template name
       */
      load: function(name, req, onload, config){
        getDust(req, config.isBuild).then(function(dust){
          text.get(req.toUrl(name), function(tpl){
            var extension = name.substring(name.lastIndexOf('.'));
            var path = name.slice(0, -(extension.length));

            tpl = text.jsEscape(tpl);

            if (config.isBuild) {
              // write out the module definition for builds
              buildMap[name] = ['define(["',dustModule,'"],function(dust){dust.loadSource(dust.compile(',"'",tpl,"'",', "',path,'")); return "',path,'";});'].join('');
            } else {
              dust.loadSource(dust.compile(tpl, path));
            }

            onload(path);
          });
        });
      },
      write: function(plugin, name, write){
        if (buildMap.hasOwnProperty(name)) {
          var fn = buildMap[name];
          write.asModule(plugin+'!'+name, fn);
        }
      }
    };
  });
