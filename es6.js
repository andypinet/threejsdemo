/**
 * Created by tongguwei on 16/4/4.
 */

var rename = require("gulp-rename");

module.exports = function(injectors) {
    'use strict';

    var debounce = require('debounce');
    var exec = require('child_process').exec;

    const babel = require('gulp-babel');
    const browserify = require("gulp-browserify");
    const babelify = require("babelify");

    var es5 = browserify({
        insertGlobals : true,
        transform: function(filename, opts){
            return babelify(filename, {
                presets: ['es2017'],
                plugins: [
                    'transform-es2015-modules-commonjs'
                ]
            });
        }
    });

    var mtl = function(name, dest, srcdest) {
        "use strict";

        let src = injectors.paths.srcRoot + `${srcdest}${name}.js`;
        let destpath = injectors.paths.destRoot + `${dest}`;

        console.log(src);
        console.log(destpath);

        return debounce(function(){
            exec(`gulp build-cmd-js --src ${src} --dest ${destpath} `, function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
            });
        }, 0);
    };

    injectors.gulp.task("build-cmd-js", function(src, dest) {
        return injectors.gulp.src(src)
            .pipe(es5)
            .pipe(injectors.gulp.dest(dest));
    });

    injectors.gulp.task("watch-cmd-js", function(name, srcdest, dest, watch) {
        var watchpath = watch || "";
        var destpath = dest || "";
        var srcdestpath = srcdest || "";
        injectors.gulp.watch(watchpath, mtl(name, destpath, srcdestpath));
    });
};