'use strict'
MetronicApp.controller('LoginController', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.$on('$viewContentLoaded', function() {
				// Login.init();
			jQuery(document).ready(function() {     
				Metronic.init(); // init metronic core components
				Layout.init(); // init current layout
				Login.init();
				Demo.init();
				   // init background slide images
				   $.backstretch([
				    "../assets/admin/pages/media/bg/1.jpg",
				    "../assets/admin/pages/media/bg/2.jpg",
				    "../assets/admin/pages/media/bg/3.jpg",
				    "../assets/admin/pages/media/bg/4.jpg"
				    ], {
				      fade: 1000,
				      duration: 8000
						}
				);
			});
		});
}]);