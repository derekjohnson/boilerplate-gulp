module.exports = function(grunt) {

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
	})
};