var gulp = require('gulp-param')(require('gulp'), process.argv);
var es6 = require("./es6");

es6({
    gulp: gulp,
    paths: {
        srcRoot: "/Users/tongguwei/frontprojects/threejsdemo",
        destRoot: "/Users/tongguwei/frontprojects/threejsdemo"
    }
});