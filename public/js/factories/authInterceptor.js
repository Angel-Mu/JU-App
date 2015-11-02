'use strict'
MetronicApp
	.factory('authInterceptor', function($rootScope, $q, $window, $injector) {
		return {
			request: function(config) {
				config.headers = config.headers || {};
				if ($window.localStorage.token) {
					config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
				}
				return config;
			},
			response: function(response) {
				if (response.status === 401) {
					// handle the case where the user is not authenticated
				}
				return response || $q.when(response);
			},
			responseError: function(rejection) {
				if (rejection.status == 401) {
					var $state = $injector.get("$state");
					$state.go('login')
					// location.reload();
				}
				return $q.reject(rejection);
			}
		};
	});