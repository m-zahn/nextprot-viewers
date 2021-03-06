module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n'
      },
      basic: {
        src: [
          'vendor/promise-6.1.0.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/handlebars/handlebars.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/nextprot/dist/nextprot.js',
//            Temporary :  
//            'bower_components/nextprot/src/nextprot-core.js',
//            'bower_components/nextprot/src/nextprot-utils.js',
//            'bower_components/nextprot/src/nextprot-init-templates.js',
//            'bower_components/nextprot/build/compiled-templates.js',
            
          'bower_components/sequence-viewer/src/sequence-viewer.js',
          'bower_components/feature-viewer/src/feature-viewer.js',
//          'src/temp_fv.js',
          'bower_components/d3/d3.min.js',
          'build/compiled-templates.js',
          'bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js',
          'src/triple-viewer.js'
        ],
        dest: 'dist/triple-viewer.bundle.js'
      },
      extras: {
        src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
              'css/style.css', 
              'css/lato.css', 
              'bower_components/feature-viewer/css/style.css'],
        dest: 'dist/triple-viewer.css'
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'https://github.com/calipho-sib/sequence-viewer.git',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },
    uglify: {
      options : {sourceMap : true},
      all: {
        src: 'dist/triple-viewer.bundle.js',
        dest: 'dist/triple-viewer.bundle.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          livereload: true,
          base: '.'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      all: {
        files: ['src/*.js', 'css/*.css', 'example/*.html'],
        tasks: ['concat']
      },
      handlebars: {
        files: 'templates/*.tmpl',
        tasks: ['handlebars:compile', 'concat']
      }
    },
    handlebars: {
      compile: {
        src: 'templates/*.tmpl',
        dest: 'build/compiled-templates.js',
        options: {
          namespace: "HBtemplates"
        }
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('prod', ['concat', 'uglify']);

  grunt.registerTask('hbs', ['handlebars:compile']);
  grunt.registerTask('serve', ['connect:server','watch']);

};
