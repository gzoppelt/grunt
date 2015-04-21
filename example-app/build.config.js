module.exports = {
    build_dir: 'build',

    app_files: {
        //source, but no specs
        js: [ 'src/**/*.js', '!src/**/*.spec.js' ],
        // the partial templates
        atpl: [ 'src/app/**/*.tpl.html' ],
        // the index.html
        html: [ 'src/index.html' ]
    },

    vendor_files: {
        js: [
            'vendor/angular/angular.js'
        ]
    }
};