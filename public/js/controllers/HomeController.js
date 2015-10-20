'use strict'
MetronicApp.controller('HomeController', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.$on('$viewContentLoaded', function() {
				LayoutHome.init();
		});
}]);