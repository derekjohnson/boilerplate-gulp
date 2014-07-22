module.exports = function(grunt) {
	
	// load tasks
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-grunticon');

	// config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		imageoptim: {
			prod: {
				options: {
					imageAlpha: true,
					quitAfter: true
				},

				src: ['dist/images']
			}
		},

		grunticon: {
			prod: {
				files: [{
					expand: true,
					cwd: 'src/assets/icons/',
					src: ['*.svg', '*.png'],
					dest: 'dist/css/icons/'
				}]

				/*options: {
					customselectors: {
						"*": [".icon-$1:before"]
						// (this is going to be very useful)
					}
					
				}*/
			}
		}
	});

	grunt.registerTask('default', ['grunticon', 'imageoptim']);
	grunt.registerTask('squash', ['imageoptim']);
	grunt.registerTask('icons', ['grunticon']);
};