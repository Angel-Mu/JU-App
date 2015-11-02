MetronicApp
	.service('AccessService', function($http) {

		this.createAccount = function(callbackFunction, user) {
			$http.post("/signup", user)
				.success(function(data, status, headers, config) {
					callbackFunction(null, data);
				})
				.error(function(data, status, headers, config) {
					if (data.hasOwnProperty('error')) {
						callbackFunction({
							msg: data.error
						}, null);
					}
					if (status == 0 && !data) {
						data = {};
						data.msg = "No hay conexión a internet. Compruebe su conexión";
					}
					callbackFunction(data, null);
				});
		};

		this.authentication = function(callbackFunction, username, password) {
			$http.post('/login', {username: username, password: password})
				.success(function(data, status, headers, config) {
					callbackFunction(null, data);
				})
				.error(function(data, status, headers, config) {
					if (status == 0 && !data) {
						data = {};
						data.msg = "No hay conexión a internet.";
					} else {
						//data = {};
						data.msg = "Lo sentimos el usuario o contraseña son incorrectos. Intenta nuevamente."
					}
					callbackFunction(data);
				});
		};

		this.getUserById = function(callbackFunction, user_id) {
			$http.get('/api/users/' + user_id)
				.success(function(data, status, headers, config) {
					callbackFunction(null, data);
				})
				.error(function(data, status, headers, config) {
					if (status == 0 && !data) {
						data = {};
						data.msg = "No hay conexión a internet.";
					} else {
						//data = {};
						data.msg = "Ha ocurrido un error al cargar información de usuario " + user_id;
					}
					callbackFunction(data, null);
				});
		};

	})
