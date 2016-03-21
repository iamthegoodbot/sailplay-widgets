module.exports = function (grunt) {

  //SPANEL BUILDER.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          //lib section
          'src/sailplay.hub.js',
          'src/sailplay.hub.actions.js'

        ],
        dest: 'dist/sailplay.hub.js'
      }
    },
    uglify: {
      min: {
        src: ['dist/sailplay.hub.js'],
        dest: 'dist/sailplay.hub.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Build spanel v4
  grunt.registerTask('default', ['concat', 'uglify']);

};