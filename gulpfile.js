const gulp = require('gulp');
const clean = require('gulp-clean');
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const replace = require('gulp-string-replace');
const deletefile = require('gulp-delete-file');
const sass = require('gulp-sass')(require('sass'));
const removeHtmlComments = require('gulp-remove-html-comments');

const copyHTML = (pageName) => {
  //--|▼| Copy main HTML file into root folder |▼|--//
  gulp
    //--| Find *.html reference files in the 'src' folder |--//
    .src(`src/front-end/${pageName}/${pageName}.html`)
    //--| Clear comments from HTML file |--//
    .pipe(removeHtmlComments())
    //--|Compress HTML file |--//
    .pipe(htmlmin({ collapseWhitespace: true }))
    //--| Copy the pageName.html into 'root' folder |--//
    .pipe(gulp.dest('dist/../'));

  //--|▼| Copy all HTML files into distributable folder |▼|--//
  let sourceFolders = ['A-body', 'B-overlay', 'C-header', 'D-footer', 'E-leftbar', 'F-rightbar', 'G-main', 'H-data'];
  let copyHTML = (item, index, array) => {
    gulp
      //--| Find *.html files in the source folder |--//
      .src(`src/front-end/${pageName}/${array[index]}/**/*.html`)
      .pipe(removeHtmlComments())
      .pipe(htmlmin({ collapseWhitespace: true }))
      //--| Copy the *.html files into distribution folder |--//
      .pipe(gulp.dest(`dist/front-end/${pageName}/${array[index]}/`));
  };
  sourceFolders.forEach(copyHTML);
};
const compileSCSS = (pageName) => {
  //--|▼| Concatenate all *.scss files |▼|--//
  let concatenate = (pageName) => {
    gulp
      //--| Find all the *.scss files |--//
      .src([
        `src/front-end/${pageName}/A-body/**/*.scss`,
        `src/front-end/${pageName}/B-overlay/**/*.scss`,
        `src/front-end/${pageName}/C-header/**/*.scss`,
        `src/front-end/${pageName}/D-footer/**/*.scss`,
        `src/front-end/${pageName}/E-leftbar/**/*.scss`,
        `src/front-end/${pageName}/F-rightbar/**/*.scss`,
        `src/front-end/${pageName}/G-main/**/*.scss`,
        `src/front-end/${pageName}/H-data/**/*.scss`,
        'src/front-end/corporate-identity.scss',
        'src/front-end/responsive-design.scss',
      ])
      //--| Combine the selected *.scss files |--//
      .pipe(concat('style.scss'))
      //--| Save the *.scss file inside source folder |--//
      .pipe(dest(`src/front-end/${pageName}/`));
  };

  //--|▼| Compile style.scss |▼|--//
  let compile = (pageName) => {
    gulp
      //--| Select style.scss |--//
      .src([`src/front-end/${pageName}/style.scss`])
      //--| Convert to file to CSS |--//
      .pipe(sass().on('error', sass.logError))
      //--| Compress style.css document |--//
      .pipe(
        uglifycss({
          maxLineLen: 1000,
          uglyComments: true,
        })
      )
      //--| Distribute CSS file for HTML |--//
      .pipe(dest(`dist/front-end/${pageName}/`));
  };

  //--|▼| Remove style.scss |▼|--//
  let remove = (pageName) => {
    gulp
      .src([`src/front-end/${pageName}/style.scss`])
      //--| Delete style.scss file using Regex |--//
      .pipe(
        deletefile({
          reg: /\w*(\-\w{8}\.js){1}$|\w*(\-\w{8}\.css){1}$/, //--|◄| Regex: Why are you so confusing? |◄|--//
          deleteMatch: false,
        })
      );
  };

  //--|▼| Execute functions asynchronously |▼|--//
  setTimeout(concatenate, 0000, pageName);
  setTimeout(compile, 5000, pageName);
  setTimeout(remove, 10000, pageName);
};
const compileCode = (pageName) => {
  //--|▼| Copy RequireJS to 'dist' folder |▼|--//
  gulp
    //--| Find the *.js file |--//
    .src('src/main.js')
    .pipe(uglify())
    //--| Set Destination |--//
    .pipe(gulp.dest('dist/'));

  //--|▼| Build reference map for compiler |▼|--//
  const reference = () => {
    //--|▼| Reference 'tsconfig.json' |▼|--//
    const typeScriptProject = typescript.createProject('tsconfig.json');
    //--|▼| Get TypeScript source code |▼|--//
    const sourceCode = typeScriptProject.src();
    //--|▼| Initialise TypeScript map for export |▼|--//
    const initializeSourcemaps = sourcemaps.init();
    //--|▼| Give source files its JavaScript identity |▼|--//
    const IdentityMap = sourcemaps.identityMap();
    //--|▼| Return code for compiling |▼|--//
    return sourceCode.pipe(initializeSourcemaps).pipe(IdentityMap).pipe(typeScriptProject());
  };

  //--|▼| Map out TypeScript to dist folder |▼|--//
  let srcUrlMapper = (file) => {
    let distFolder = gulp.dest('dist/');
    return distFolder + file.relative.toString().split('\\').join('/') + '.map';
  };

  //--|▼| Compile TypeScript |▼|--//
  let compileTypes = () => {
    let typesFolder = gulp.dest('types/');
    let typeScriptCompiled = reference();

    typeScriptCompiled.dts.pipe(typesFolder).on('error', function (err) {
      console.log('Gulp says: ' + err.message);
    });

    typeScriptCompiled.js
      .pipe(
        sourcemaps
          .write('./', {
            includeContent: false,
            addComment: true, //This "Comment" is the "COMMENT" that the browser uses to reference the file.
            sourceMappingURL: srcUrlMapper,
            sourceRoot: '../src',
          })
          .pipe(uglify())
      )
      .pipe(dest('dist/'));
  };

  //--|▼| Copy front-end pages |▼|--//
  let copyFront = (pageName) => {
    let frontFolders = ['A-body', 'B-overlay', 'C-header', 'D-footer', 'E-leftbar', 'F-rightbar', 'G-main', 'H-data'];
    for (let i = 0; i < frontFolders.length; i++) {
      gulp
        //--| Find the *.js file |--//
        .src(`dist/front-end/${pageName}/${frontFolders[i]}/**/*`)
        //--| Set Destination |--//
        .pipe(gulp.dest(`dist/front-end/${pageName}/${frontFolders[i].split('-')[1]}/`));
    }
  };

  //--|▼| Delete front-end clutter |▼|--//
  let cleanFront = (pageName) => {
    return gulp
      .src(
        [
          `dist/front-end/${pageName}/A-body`,
          `dist/front-end/${pageName}/B-overlay`,
          `dist/front-end/${pageName}/C-header`,
          `dist/front-end/${pageName}/D-footer`,
          `dist/front-end/${pageName}/E-leftbar`,
          `dist/front-end/${pageName}/F-rightbar`,
          `dist/front-end/${pageName}/G-main`,
          `dist/front-end/${pageName}/H-data`,
        ],
        { read: false }
      )
      .pipe(clean());
  };

  //--|▼| Execute functions asynchronously |▼|--//
  setTimeout(compileTypes, 0000);
  setTimeout(copyFront, 5000, pageName);
  setTimeout(cleanFront, 10000, pageName);
};

//-------------------------------------------------//
gulp.task('copyIndex', async () => {
  let pageName = 'index';

  copyHTML(pageName);
  compileSCSS(pageName);
  compileCode(pageName);
});
gulp.task('backupDependencies', async () => {
  //--|▼| Copy images to 'dist' folder |▼|--//
  gulp
    //--| Find the *.js file |--//
    .src('src/images/**/*')
    //--| Set Destination |--//
    .pipe(gulp.dest('dist/images/'));

  //--|▼| Copy vendors to 'dist' folder |▼|--//
  gulp
    //--| Find the *.js file |--//
    .src('src/vendors/**/*')
    //--| Set Destination |--//
    .pipe(gulp.dest('dist/vendors/'));
});
//-------------------------------------------------//

/*
gulp.task('compileBack', async (callback) => {
  let pageName = 'index';
});
gulp.task('compileFront', async (callback) => {
  let pageName = 'index';
});
*/
