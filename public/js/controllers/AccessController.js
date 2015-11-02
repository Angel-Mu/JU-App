'use strict'
MetronicApp
	.controller('SignupController', ['$scope', '$rootScope', '$state', 'AccessService', 'CommonService',
													function($scope, $rootScope, $state, AccessService, CommonService) {
		$rootScope.$on('$viewContentLoaded', jQueryReady);
		$scope.user = {};

		$scope.getCatalog = function(catalog, query){
			CommonService.getCatalog(function(err, data){
				if(err){
					console.log(err);
					return;
				}
				$scope[catalog] = data;
			}, catalog, query);
		}

		$scope.postNewUser = function(){
			AccessService.createAccount(function(err, data){
				if(err){
					console.log(err)
				}else{
					console.log(data);
					$state.go("app.dashboard")
				}
			},$scope.user);
		}

		function init(){
			$scope.getCatalog('profiles');
		}

		init();
	}])
	.controller('LoginController', ['$scope', '$rootScope', '$state', '$cookieStore', '$window', 'AccessService', 'CommonService', 
													function($scope, $rootScope, $state, $cookieStore, $window, AccessService, CommonService) {
		$rootScope.$on('$viewContentLoaded', jQueryReady);

		$scope.signin = function(){
			// var btn = document.getElementById('send');
			// btn.className = btn.className + " active";
			AccessService.authentication(function(err, data) {
				console.log(err);
				if (err) {
					$scope.authError = err.msg;
					// $window.localStorage.token;
					//return;
				}
				if (!data || !data.user) {
					$scope.authError = 'Usuario o contraseña incorrectos';
					document.getElementById('password').focus();
					delete $window.localStorage.token;
				} else {
					$window.localStorage.token = data.token;
					AccessService.getUserById(function(err, data) {
						if (err) {
							console.log(err);
							return
						}

						$rootScope.user = data;
						$cookieStore.put('JU_user_id', data._id);
						$cookieStore.put('JU_user_data', data);
						$cookieStore.put('JU_user_logged', true);
						$state.go('app.dashboard');
					}, data.user._id);
				}
				// btn.className = "btn btn-lg btn-primary btn-block has-spinner";
			}, $scope.user.username, $scope.user.password);
		}

		function init() {
			$cookieStore.put('JU_user_logged', false);
			$scope.user = {};
		}

		init();

	}])
	.controller('ForgetPasswordController', ['$scope', '$rootScope', 'AccessService', 'CommonService', function($scope, $rootScope, AccessService, CommonService) {
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
