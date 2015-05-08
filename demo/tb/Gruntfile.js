module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          //lib section
          'js/vendor/*.js',
          'js/*.js'
        ],
        dest: 'js/tb.sailplay.min.js'
      }
    },
    uglify: {
      min: {
        src: ['js/tb.sailplay.min.js'],
        dest: 'js/tb.sailplay.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};