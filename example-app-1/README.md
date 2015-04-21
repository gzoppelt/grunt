#Grunt Build
##Essential AngularJS

In my first attempt I got stuck, so I will start all over again with one commit per chapter.

### Chapter 3: Modular Angular
commit:

```sh
/example-app
    /build
    /node_modules
    /src
        /app
            app.js
                angular.module('example-app', [
                    'example-app.login'
                ])

            /login
                login.js
                    angular.module('example-app.login', [
                    ])

                    routings	    |
                    controller(s)   |
                    services        |
                    directives      |  that are specific for this module

                login.spec.js						                    loginSpec.js		??
                    describe(“example-app.login”, function () {
                        //code goes here
                    });

                login.tpl.html						                    loginTemplate.html	??

        index.html

    /vendor          if (.bowerrc: {"directory": "vendor"}) {/vendor} else {/bower_components}


```

## Barebone GruntJS
- watch source code and automatically build when it changes
- run JSHint to make sure there are no obvious flubs and keep the style consistent
- run the unit tests
- start local development server that will serve the file while working
- convert all html partial templates to Javascript objects
 
```sh
$ npm install -g grunt-cli

/example-app 
	package.json
        {
            "name": "example-app",
            "version": "0.1.0",
            "devDependencies": {
                "grunt": "~0.4.0",
                "grunt-contrib-watch": "~0.4.0"
            }
        }

$ npm install

     Gruntfile.js
            module.exports = function(grunt) {
                grunt.loadNpmTasks('grunt-contrib-watch');
                var taskConfig = {
                    pkg: grunt.file.readJSON('package.json'),
                    watch: {
                        jssrc: {
                            files: [
                                'src/**/*.js'
                            ],
                            tasks: [

                            ]
                        }
                    }
                };
                grunt.initConfig(taskConfig);
                grunt.registerTask('default', []);
            };

$ grunt
Done without errors.
```

##Bower for Vendor Libraries
```sh
$ npm install -g bower

$ bower init

creates bower.json:
    {
        name: 'example-app',
        version: '0.0.1',
        authors: [
            'Joel Hooks <joelhooks@gmail.com>'
        ],
        description: 'This is an example.',
        license: 'MIT',
        private: true,
        ignore: [
            '**/.*',
            'node_modules',
            'bower_components',
            'test',
            'tests'
        ]
    }

/example-app
    .bowerrc
        {
            "directory": "vendor"
        }

$bower install angular --save
```
    **build.config.js**
```js
    module.exports = {
        build_dir: 'build',

        app_files: {
            js:     ['src/**/*.js', '!src/**/*.spec.js'],    //source w/o specs
            atpl:   ['src/app/**/*.tpl.html'],
            html:   ['src/index.html'],
        },

        vendor_files: {
            js: [
                'vendor/angular/angular.js'
            ]
        }
    };
```
    **Gruntfile.js**
```js
    module.exports = function(grunt) {
        grunt.loadNpmTasks('grunt-contrib-watch');

        var userConfig = require('./build.config.js');                  // userConfig
        var taskConfig = {
            pkg: grunt.file.readJSON('package.json'),
            watch: {
                jssrc: {
                    files: ['<%= app_files.js %>'],                        // app_files
                    tasks: []
                }
            }
        };
        grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));  // userConfig
        grunt.registerTask('default', []);

    };
```
