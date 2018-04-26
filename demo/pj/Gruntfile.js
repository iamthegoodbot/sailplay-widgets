module.exports = function (grunt) {

  //SPANEL BUILDER.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          //lib section
          'js/angular.js',
          'js/sailplay_hub.js',
          'js/pj.filters.js',
          'js/pj.services.js',
          'js/sailplay.pj.js'
        ],
        dest: 'js/dist/sailplay_pj.js'
      }
    },
    ngAnnotate: {
      annotate: {
        files: {
          'js/dist/sailplay_pj.js': ['js/dist/sailplay_pj.js']
        }
      }
    },
    uglify: {
      min: {
        src: ['js/dist/sailplay_pj.js'],
        dest: 'js/dist/sailplay_pj.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Build spanel v4
  grunt.registerTask('default', ['concat', 'ngAnnotate', 'uglify']);

};