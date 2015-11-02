MetronicApp
	.service('CommonService', function($http) {

		this.getCatalog = function(callback, catalog, params){
			$http.get('/' + catalog, {params:params})
			.success(function(data, status, headers, config) {
				callback(null, data);
			})
			.error(function(data, status, headers, config) {
				if (status == 0 && !data) {
					data = {};
					data.msg = "No hay conexión a internet.";
				} else {
					if(!data)data = {};
					data.msg = "No se pudo cargar el catálogo de  "+catalog+"."
				}
				callback(data);
			});
		};

		this.getCatalogLocked = function(callback, catalog, params){
			$http.get('/api/' + catalog, {params:params})
			.success(function(data, status, headers, config) {
				callback(null, data);
			})
			.error(function(data, status, headers, config) {
				if (status == 0 && !data) {
					data = {};
					data.msg = "No hay conexión a internet.";
				} else {
					if(!data)data = {};
					data.msg = "No se pudo cargar el catálogo de  "+catalog+"."
				}
				callback(data);
			});
		};

	})
