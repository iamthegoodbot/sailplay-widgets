module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          //lib section
          '../../hub/dist/sailplay_hub.js',
          'js/vendor/jquery.min.js',
          'js/vendor/slider.min.js',
          'js/vendor/templates.min.js',
          'js/*.js'
        ],
        dest: 'js/dist/tb.sailplay.js'
      }
    },
    uglify: {
      min: {
        src: ['js/dist/tb.sailplay.js'],
        dest: 'js/dist/tb.sailplay.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};