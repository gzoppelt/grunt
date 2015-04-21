module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');

    var userConfig = require('./build.config.js');

    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            jssrc: {
                files: [
                    '<%= app_files %>'
                ],
                tasks: [

                ]
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig);

    grunt.registerTask('default', []);

};