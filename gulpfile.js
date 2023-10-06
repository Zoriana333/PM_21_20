const { src, dest, watch, parallel } = require ("gulp");
const gulp = require("gulp");
const concat = require ("gulp-concat");
const sass = require ("gulp-sass")(require('sass'));
const autoprefixer = require ("gulp-autoprefixer");
const cssnano = require ("gulp-cssnano");
const rename = require ("gulp-rename");
const uglify = require ("gulp-uglify");
const imagemin = require ("gulp-imagemin");


gulp.task('html', () => {
    return gulp.src("app/*.html")
    .pipe (gulp.dest("dist"));
});

gulp.task('sass', () => {
    return gulp.src("app/sass/*.scss")
    .pipe(concat('styles.scss'))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest("dist/css"));
});

gulp.task('scripts', () => {
    return gulp.src("app/js/*.js")
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest("dist/js"));
});

gulp.task('img', () => {
    return gulp.src ( "app/img/*.+(jpg|jpeg|png|gif)")
 .pipe (imagemin ({
 progressive: true,
 svgoPlugins: [{removeViewBox: false}],
 interlaced: true
 }))
 .pipe (dest ("dist/images"))
});

gulp.task('watch', () => {
    gulp.watch("app/*html", gulp.parallel('html'));
    gulp.watch("app/sass/*.sass", gulp.parallel('sass'));
    gulp.watch("app/js/*.js", gulp.parallel('scripts'));
    gulp.watch("app/img/*.+(jpg|jpeg|png|gif)", gulp.parallel('img'));
});

gulp.task('default', gulp.series('html', 'sass', 'scripts', 'img', 'watch'));

/*function defaultTask(cb) {
    cb();
}

exports.default = defaultTask;*/

