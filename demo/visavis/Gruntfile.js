module.exports = function (grunt) {

  //SPANEL BUILDER.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          //lib section
          //'app/js/**/*.js',
		        'app/js/src/sailplay_hub.js',
          'app/js/src/angular.js',
          'app/js/src/angular-pagination.js',
          'app/js/src/angular-sanitize.js',
          'app/js/src/sailplay.visavis.banner.js',
          'app/js/src/sailplay.visavis.extra.js',
          'app/js/src/sailplay.visavis.gifts.js',
          'app/js/src/sailplay.visavis.js',
          'app/js/src/sailplay.visavis.profile.js',
          'app/js/src/sailplay.visavis.tasks.js'
        ],
        dest: 'app/js/dist/sailplay_visavis.js'
      }
    },
    ngAnnotate: {
      annotate: {
        files: {
          'app/js/dist/sailplay_visavis.js': ['app/js/dist/sailplay_visavis.js']
        }
      }
    },
    uglify: {
      min: {
        src: ['app/js/dist/sailplay_visavis.js'],
        dest: 'app/js/dist/sailplay_visavis.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Build spanel v4
  grunt.registerTask('default', ['concat', 'ngAnnotate', 'uglify']);

};