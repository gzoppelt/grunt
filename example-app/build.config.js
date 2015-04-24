module.exports = {
    build_dir: 'build',
    app_files: {
        // source, but NO specs
        js: [ 'src/app/**/*.js', '!src/app/**/*.spec.js' ],

        // our partial templates
        atpl: [ 'src/app/**/*.tpl.html' ],

        // the index.html
        html: [ 'src/index.html' ]
    },
    vendor_files: {
        js: [
            'vendor/**/angular.js',
            'vendor/angular-ui-router/release/angular-ui-router.js'
        ]
    },
    less: {
        build: {
            files: {
                '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/less/main.less'
            }
        }
    }
};