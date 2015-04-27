module.exports = {
    build_dir: 'build',
    dist_dir: 'dist',
    app_files: {
        // source, but NO specs
        js: [ 'src/app/**/*.js', '!src/app/**/*.spec.js', '!src/app/**/*.e2e.js' ],

        // our partial templates
        atpl: [ 'src/app/**/*.tpl.html' ],

        // the index.html
        html: [ 'src/index.html' ]
    },
    vendor_files: {
        js: [
            'vendor/**/angular.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-mocks/angular-mocks.js'
        ]
    }

};