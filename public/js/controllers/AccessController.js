'use strict'
MetronicApp
	.controller('SignupController', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.$on('$viewContentLoaded', jQueryReady);
	}])
	.controller('LoginController', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.$on('$viewContentLoaded', jQueryReady);
	}])
	.controller('LoginController', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.$on('$viewContentLoaded', jQueryReady);
	}])


var jQueryReady = function() {
	jQuery(document).ready(initBackstretch);
}

var initBackstretch = function() {
	$.backstretch([
		"../assets/admin/pages/media/bg/1.jpg",
		"../assets/admin/pages/media/bg/2.jpg",
		"../assets/admin/pages/media/bg/3.jpg",
		"../assets/admin/pages/media/bg/4.jpg"
	], {
		fade: 1000,
		duration: 5000
	});
}
