module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nodemon');

    var userConfig = require('./build.config.js');

    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        clean: [
            '<%= build_dir %>'
        ],
        copy: {
            appjs: {
                files: [
                    {
                        src:    ['<%= app_files.js %>'],
                        dest:   '<%= build_dir %>/',
                        cwd:    '.',
                        expand: true
                    }
                ]
            }

        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*js'
                ]
            }
        },
        nodemon:{
            dev: {
                options: {
                    file: 'server/server.js',
                    watchedFolders: ['server']
                }
            }
        },
        watch: {
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['copy', 'index']
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [],
                options: {
                    livereload: false
                }
            },
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('default', ['clean', 'copy', 'index', 'nodemon', 'watch']);

    function filterForJs(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var dirReg = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g');
        var jsFiles = filterForJs(this.filesSrc).map(function (file) {
            return file.replace(dirReg, '');
        });
        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
        grunt.log.writeln(this.data.dir);
    });



};