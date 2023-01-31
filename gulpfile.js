const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imágenes WEBP y Avif
const cache = require("gulp-cache");
const webp = require('gulp-webp');
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

// JavaScript
const terser = require('gulp-terser-js');

function css(done) {
    src("scss/**/*.scss") // Identificar el archivo SASS
        .pipe(sourcemaps.init()) // Inicializa sourcemaps
        .pipe(plumber())
        .pipe(sass()) // Compilar el archivo SASS a CSS
        .pipe(postcss([autoprefixer, cssnano])) // Minificar el código CSS
        .pipe(sourcemaps.write('.')) // Registra sourcemaps
        .pipe(dest("build/css")); // Guardar el CSS en disco duro

    done();
}

// imágenes en general
function imagenes(done) {

    const opciones = {
        optimizationLevel: 3,
    }

    src("img/**/*.*")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"));

    done();
}

// convierte imágenes de cualquier formato a webp
function versionWebp(done) {

    const opciones = {
        quality: 50,
    }

    src("img/**/*.*")
        .pipe(webp(opciones))
        .pipe(dest("build/img"));


    done();
}
// convierte imágenes de cualquier formato a avif
function versionAvif(done) {

    const opciones = {
        quality: 50,
    }

    src("img/**/*.*")
        .pipe(avif(opciones))
        .pipe(dest("build/img"));


    done();
}

// JavaScript
function javascript(done) {
    src("js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/js"));
    done();
}

function dev(done) {

    watch("scss/**/*.scss", css);
    watch("js/**/*.js", javascript);
    done();
}

/* crea build de producción: npx gulp prod */
function prod(done){
    src("build/**/*.*")
        .pipe(dest("prod/build"));
    src("video/**/*.*")
        .pipe(dest("prod/video"));
    src("index.html")
        .pipe(dest("prod"));
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
exports.prod = prod;

