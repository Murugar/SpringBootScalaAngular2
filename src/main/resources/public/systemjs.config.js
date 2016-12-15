(function(global) {

  // var ngVer = '@2.0.0'; // lock in the angular package version; do not let it float to current!




  //map tells the System loader where to look for things
  var map = {
    'app': 'app',

    '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
    '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
    '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
    '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',


    '@angular': 'node_modules/@angular', // sufficient if we didn't pin the version
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api', // get latest
    'rxjs': 'node_modules/rxjs',
    'sinon': 'node_modules/sinon/lib/sinon.js',
    'ng2-nvd3': 'node_modules/ng2-nvd3/build/lib/ng2-nvd3.js',
    'ts': 'node_modules/plugin-typescript/lib/plugin.js',
    'typescript': 'node_modules/typescript/lib/typescript.js',
  };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': {
      main: 'main.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    },
    'sinon': {
        defaultExtension: 'js'
      },
    'angular2-in-memory-web-api': {
      defaultExtension: 'js'
    },
    'zone.js': {
      defaultExtension: 'js'
    },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/' + pkgName] = 'node_modules/@angular/' + pkgName;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/' + pkgName] = {
      main: pkgName + '.umd.js',
      defaultExtension: 'js'
    };

    // Individual files (~300 requests):
    packages['@angular/' + pkgName] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
  });

  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    // transpiler: 'typescript',
    //typescriptOptions: {
    // emitDecoratorMetadata: true
    //},

    //map: map,
    //packages: packages


  }

  System.config({


    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true,
      module: "commonjs",
      experimentalDecorators: true
    },


    paths: {

      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      // app: 'app',
      'app': 'app/',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'traceur': 'npm:traceur',
      'sinon': 'npm:sinon',
      'nock': 'npm:nock',
      '@angular': 'node_modules/@angular',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ts': 'node_modules/plugin-typescript/lib/plugin.js',
      'typescript': 'node_modules/typescript/lib/typescript.js',
      'ng2-nvd3': 'node_modules/ng2-nvd3/build/lib/ng2-nvd3.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension

    packages: {
      'app': {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      'rxjs': {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        defaultExtension: 'js'
      },
      'zone.js': {
        defaultExtension: 'js'
      },
    }


  /*packages: {
    app: {
      main: './main.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }*/
  });

})(this);


