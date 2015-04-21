module.exports = {

  build_dir: 'build',
  dist_dir: 'dist',

  app_files: {
    // source, but NO specs
    js: [ 'src/app/**/*.js', '!src/app/**/*.spec.js' ],
    // our partial templates
    atpl: [ 'src/app/**/*.tpl.html' ],
    // the index.html
    html: [ 'src/index.html' ]
  },

  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  vendor_files: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js'
    ]
  }
};