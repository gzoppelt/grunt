module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-karma');

    var userConfig = require('./build.config.js');

    var taskConfig = {
        //variables
        pkg:            grunt.file.readJSON('package.json'),
        dist_target:    '<%= dist_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>',

        //grunt tasks
        browserify: {
            build: {
                src: ['src/modules/modules.js'],
                dest: '<%= build_dir %>/bundle.js',
                options: {
                    debug: true
                }
            }
        },

        clean: [
            '<%= build_dir %>'
        ],

        concat: {
            dist_js: {
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/bundle.js',
                    'module.prefix',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= build_dir %>/templates-app.js',
                    'module.suffix'
                ],
                dest: '<%= dist_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logCurrentOutput: true
                }
            }
        },

        copy: {
            appjs: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            vendorjs: {
                files: [
                    {
                        src:  ['<%= vendor_files.js %>'],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            templates: {
                files: [
                    {
                        src: ['<%= app_files.atpl %>'],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            }
        },

        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            }
        },

        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= build_dir %>/bundle.js',
                    '<%= build_dir %>/**/*.css'
                ]
            },
            dist: {
                dir: '<%= dist_dir %>',
                src: [
                    '<%= dist_dir %>/**/*.js',
                    '<%= dist_dir %>/**/*.css'
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css' : 'src/less/main.less'
                }
            },
            dist: {
                options: {
                    compress: true
                },
                files: {
                    '<%= dist_target %>.css': 'src/less/main.less'
                }
            }
        },

        ngAnnotate: {
            compile: {
                files: [
                    {
                        src:  '<%= dist_target %>.js',
                        dest: '<%= dist_target %>.js'
                    }
                ]
            }
        },

        nodemon: {
            dev: {
                script: 'server/server.js',
                options: {
                    watch: ['server']
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= dist_target %>.js' : '<%= dist_target %>.js'
                }
            }
        },

        watch: {
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['karma:unit', 'copy', 'index']
            },
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [],
                options: {
                    livereload: false
                }
            },
            modules: {
                files: ['src/modules/**/*'],
                tasks: ['browserify']
            },
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less:build']
            }
        }

    };


    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('default', ['build', 'concurrent']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'karma',
        'html2js',      // !! html2js should run before index, so the script can be added to index.html
        'browserify',
        'less:build',
        'index:build'
    ]);
    grunt.registerTask('dist', [
        'build',
        'concat',
        'ngAnnotate',
        'uglify',
        'less:dist',
        'index:dist'
    ]);


    function filterForExtension(extension, files) {
        var regExt = new RegExp('\\.' + extension + '$'),
            regDir = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('dist_dir') + ')\/', 'g');

        return files.filter(function (file) {
            return file.match(regExt);
        }).map(function (file) {
            return file.replace(regDir, '');
        });
    }

    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var  jsFiles = filterForExtension('js',  this.filesSrc);
        var cssFiles = filterForExtension('css', this.filesSrc);

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

};