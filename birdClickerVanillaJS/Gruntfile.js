module.exports = function(grunt){
	grunt.initConfig({
	 responsive_images: {
	      dev: {
	        options: {
	          engine: 'im',
	          sizes: [{
	            width: 200,
	            suffix: '_small',
	            quality: 100
	          }]
	        },
	        files: [{
	          expand: true,
	          src: ['*.{gif,jpg,png}'],
	          cwd: 'images/',
	          dest: 'images_small/'
	        }]
	      }
	    },

	    /* Clear out the images_small directory if it exists */
	    clean: {
	      dev: {
	        src: ['images_small'],
	      },
	    },

	    /* Generate the images_small directory if it is missing */
	    mkdir: {
	      dev: {
	        options: {
	          create: ['images_small']
	        },
	      },
	    },
	});
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images']);
}