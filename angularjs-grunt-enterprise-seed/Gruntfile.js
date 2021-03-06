  module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var userConfig = require('./build.config.js');

  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),
    dist_target: '<%= dist_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>',
    
    uglify: {
      dist: {
        files: {
          '<%= dist_target %>.js': '<%= dist_target %>.js'
        }
      }
    },

    ngAnnotate: {
      compile: {
        files: [
          {
            src: [ '<%= dist_target %>.js' ],
            dest: '<%= dist_target %>.js'
          }
        ]
      }
    },

    concat: {
      dist_js: {
        src: [
          '<%= vendor_files.js %>',
          'module.prefix',
          '<%= build_dir %>/src/**/*.js',
          '<%= build_dir %>/templates-app.js',
          'module.suffix',
          '<%= build_dir %>/bundle.js'
        ],
        dest: '<%= dist_target %>.js'
      }
    },  

    clean: [
      '<%= build_dir %>'
    ],

    copy: {
      appjs: {
        src: [ '<%= app_files.js %>' ],
        dest: '<%= build_dir %>/',
        cwd: '.',
        expand: true
      },
      vendorjs: {
        files: [
          {
            src: [ '<%= vendor_files.js %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
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
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '<%= build_dir %>/bundle.js',
          '<%= build_dir %>/assets/**/*.css'
        ]
      },
      dist : {
       dir: '<%= dist_dir %>',
        src: [
          '<%= dist_dir %>/**/*.js',
          '<%= dist_dir %>/**/*.css'
        ] 
      }
    },
    karmaconfig: {
      unit: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= html2js.app.dest %>',
          '<%= test_files.js %>'
        ]
      }
    },
    watch: {
      jssrc: {
        files: [
          '<%= app_files.js %>'
        ],
        tasks: ['copy', 'index']
      },

      html: {
        files: [ '<%= app_files.html %>' ],
        tasks: [ 'index:build' ]
      },

      less: {
        files: ['src/less/**/*.less'],
        tasks: [ 'less:build']
      },

      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [],
        options: {
          livereload: false
        }
      },
      modules: {
        files: 'src/modules/**/*.js',
        tasks: ['browserify']
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'server/server.js',
          watchedFolders: ['server']
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch'],

        options: {
          logConcurrentOutput: true
        }
      }
    },

    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: 'src/app'
        },
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/templates-app.js'
      }
    },

    browserify: {
      build: {
        src: ['src/modules/modules.js'],
        dest: '<%= build_dir %>/bundle.js',
        options: {
          debug: true
        },
        aliasMappings: [
          {
            cwd: 'src/modules/',
            src: ['**/*.js', '!**/*.spec.js'],
            dest: 'modules/'
          }
        ]
      }
    },

    less: {
      build: {
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/less/main.less'
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
    }
  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.registerTask('default', ['build', 'concurrent']);

  grunt.registerTask('build', [
    'clean', 'copy', 'html2js', 'browserify', 'less:build', 'index:build'
  ]);

  grunt.registerTask('dist', [
    'build', 'concat', 'ngAnnotate', 'uglify', 'less:dist', 'index:dist'
  ]);


  function filterForExtension(extension, files, dir) {
    var regex = new RegExp('\\.' + extension + '$'),
      dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('dist_dir') + ')\/', 'g');;
    return files.filter(function (file) {
      return file.match(regex);
    }).map(function (file) {
      return file.replace(dirRE, '');
    });
  }

  grunt.registerMultiTask('index', 'Process index.html template', function () {
    var jsFiles = filterForExtension('js', this.filesSrc),
      cssFiles = filterForExtension('css', this.filesSrc);

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

  grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
    var jsFiles = this.filesSrc.filter(function (file) {
      return file.match(/\.js$/);
    });

    grunt.file.copy('karma/karma.conf.tpl.js', grunt.config('build_dir') + '/karma.conf.js', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles
          }
        });
      }
    });
  });
};