module.exports = function (grunt) {

		grunt.initConfig({
				pkg: grunt.file.readJSON('package.json'),
				concat: {
						dist: {
								src: [
										'js/vendor/jquery-1.10.1.min.js',
										'js/vendor/modernizr-2.6.2-respond-1.1.0.min.js',
										'js/vendor/angular.js',
										'js/vendor/sailplay_hub.js',
										'js/fallback/jquery.backgroundSize.js',
										'js/fallback/jquery.placeholder.min.js',
										'js/fallback/selectivizr-min.js',
										'js/plugins/*.js',
										'js/*.js'
								],
								dest: 'js/dist/pj_questionnaire.sailplay.js'
						}
				},
				uglify: {
						min: {
								src: ['js/dist/pj_questionnaire.sailplay.js'],
								dest: 'js/dist/pj_questionnaire.sailplay.min.js'
						}
				},
				less: {
						dev: {
								src: ['less/main.less'],
								dest: 'css/main.css'
						}
				},
				watch: {
						style: {
								files: ['less/**/*.less'],
								tasks: ['less:dev']
						}
				}
		});

		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-uglify');

		//grunt.registerTask('default', ['concat']);
		grunt.registerTask('default', ['concat', 'uglify', 'less']);
		grunt.registerTask('styles', ['watch:style']);

};