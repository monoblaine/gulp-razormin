A gulp plugin to minify ASP.NET MVC Razor view files.

# Installing

```
npm install --save-dev https://github.com/monoblaine/gulp-razormin
```

# Sample `gulpfile.js`

```js
var del = require("del");
var rename = require("gulp-rename");
var razormin = require("gulp-razormin");

gulp.task("clean.minifyRazorViews", function () {
    return del("./Views/**/*.min.cshtml");
});

gulp.task("minifyRazorViews", ["clean.minifyRazorViews"], function () {
    return gulp.src(["./Views/**/*.cshtml", "!./Views/**/*.min.cshtml"])
            .pipe(razormin())
            .pipe(rename((_path) => { _path.basename += ".min"; return _path; }))
            .pipe(gulp.dest("./Views"));
});
```