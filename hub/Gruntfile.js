module.exports = function (grunt) {

  //SPANEL BUILDER.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          //lib section
//          'src/porthole.js',
          'src/sailplay_hub.js'
        ],
        dest: 'dist/sailplay_hub.js'
      }
    },
    uglify: {
      min: {
        src: ['dist/sailplay_hub.js'],
        dest: 'dist/sailplay_hub.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Build spanel v4
  grunt.registerTask('default', ['concat', 'uglify']);

};