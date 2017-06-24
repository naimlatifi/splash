import browserSync from 'browser-sync';
import gulp        from 'gulp';
import babel       from 'gulp-babel';
import cleanCSS    from 'gulp-clean-css';
import concat      from 'gulp-concat';
import rename      from 'gulp-rename';
import sass        from 'gulp-sass';
import uglify      from 'gulp-uglify';
import del         from 'del';


const server = browserSync.create();

const reload = (done) => {
  server.reload();
  done();
}

const serve = (done) => {
  server.init({
    server: {
      baseDir: './build'
    }
  })
  done();
}

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
    .pipe(sass().on('error', sass.logError))
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
  gulp.watch(paths.templates.src, gulp.series(templates, reload));
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
}

const clean = () => del([ 'build' ]);

const dev = gulp.series(clean, templates, styles, scripts, serve, watch);

export default dev;
export { templates, styles, scripts, clean };