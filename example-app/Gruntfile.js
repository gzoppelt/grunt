module.exports = function (grunt) {
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