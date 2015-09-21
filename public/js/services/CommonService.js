MetronicApp
	.service('CommonService', function($http, jumpersup_url) {

		this.getUsers = function(callback, params){
			$http.get(jumpersup_url + '/api/users', {params:params})
			.success(function(data, status, headers, config) {
				callback(null, data);
			})
			.error(function(data, status, headers, config) {
				if (status == 0 && !data) {
					data = {};
					data.msg = "No hay conexión a internet.";
				} else {
					//data = {};
					data.msg = "No se pudo cargar el catálogo de usuarios."
				}
				callback(data);
			});
		};

	});