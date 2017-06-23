import gulp     from 'gulp';
import babel    from 'gulp-babel';
import cleanCSS from 'gulp-clean-css';
import concat   from 'gulp-concat';
import rename   from 'gulp-rename';
import sass     from 'gulp-sass';
import uglify   from 'gulp-uglify';
import del      from 'del';


const paths = {
  templates: {
    src: 'src/*.html',
    dest: 'build/'
  },
  styles: {
    src: 'src/assets/**/*.css',
    dest: 'build/assets/styles/'
  },
  scripts: {
   src: 'src/assets/**/*.js',
   dest: 'build/assets/scripts' 
  }
}


const templates = () => {
  return gulp.src(paths.templates.src)
  .pipe(gulp.dest(paths.templates.dest))
}


const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}


const scripts = () => {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}


const watch = () => {
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

const clean = () => del([ 'build' ]);

const build = gulp.series(clean, gulp.parallel(templates, styles, scripts));

export { build, templates, styles, scripts, watch, clean }