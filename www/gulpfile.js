// Install all gulp plugins at once
// npm install gulp --save-dev & npm install gulp-less --save-dev & npm install gulp-autoprefixer --save-dev & npm install gulp-minify-css --save-dev & npm install gulp-uglify --save-dev & npm install gulp-rename --save-dev & npm install gulp-concat --save-dev & npm install gulp-notify --save-dev & npm install gulp-plumber --save-dev & npm install gulp-imagemin --save-dev & npm install gulp-uncss --save-dev

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concate = require('gulp-concat');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var uncss = require('gulp-uncss');


/*
==========================================================
                    LESS
            ______________________
Less compil -> Autoprefixr -> Uncss (remove non used CSS rules in *.html) ->
==========================================================
*/


gulp.task('style', function(){
    gulp.src('assets/less/style.less')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(less())
    .pipe(autoprefixer())
    /*.pipe(uncss({
        html: ['*.html'],
        ignore: ['.active', '.open']
    }))*/
    //.pipe(minifyCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./dist/css'));
});

/*
==========================================================
                  Javascript
                ______________________

==========================================================
*/


gulp.task('script',  function(){
     gulp.src('assets/js/main.js')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('dist/js/'));
});
/*
==========================================================
              Images
        ______________________

==========================================================
*/
gulp.task('images', function() {
    return gulp.src([
        'assets/pic/*.{gif,jpg,png,svg}',
        'assets/pic/*/*.{gif,jpg,png,svg}'
    ])
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('dist/pic/'));
});
/*
==========================================================
              Watch
         ___________________

    Déclencher une tâche particulière 
    si certains fichiers sont modifiés

==========================================================
*/
gulp.task('watch', function(){
    gulp.watch('assets/js/main.js', ['script']);
    gulp.watch('assets/less/*/*.less', ['style']);
    gulp.watch('assets/less/style.less', ['style']);
    gulp.watch('*.html', ['style']);
});


/*
==========================================================
            Tache "Gulp" par Default
==========================================================
*/

gulp.task('default', ['style', 'script', 'images', 'watch'], function(){

});