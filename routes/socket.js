// export function for listening to the socket
var Session = require('../models/SessionsModel.js');
var usersConnected = [];
var log = require('../config/logger.js');

module.exports = function(socket) {
	

	function init() {
		log.info("Socket is alive with ID " + socket.id);
		// console.log("inicializando");
		// socket.emit('register_user');
	}
	init();

	socket.on('new_message', function(data, callback) {
		// New Message Example
		// console.log(data.params);
		// console.log("nuevo mensaje de: " + data.params.sent_by + " - para: " + data.params.sent_to);
		// var client = data.params.sent_to;
		// Session
		// 	.find({
		// 		user_id: client
		// 	}, function(err, data) {
		// 		if (err) {
		// 			console.log("ERROR---- ", err);
		// 		}
		// 		if (data) {
		// 			console.log(data);
		// 			for (var i = 0; i < data.length; i++) {
		// 				if (socket.server.sockets.connected[data[i].socket_id]) {
		// 					socket.server.sockets.connected[data[i].socket_id].emit('new_message', {
		// 						message: data.params
		// 					});
		// 				}
		// 			}
		// 		}
		// 	});
	});

	socket.on('logout', function(user_id) {
		// Unregister user
		// console.log("socket on logout user_id " + user_id);
		// removeUser(user_id, socket.id);
	});

	socket.on('login', function(user) {
		// Register new user when a client is conected
		// console.log("socket on connection with user " + user._id + " socket -- " + socket.id + " and from device -- " + user.from_device);
		// var registered = registerUser(user, socket.id);
	});

	socket.on('register-on-disconnect', function(user) {

		// console.log("socket on reconnect with user_id " + user._id + " socket.id -- " + socket.id);
	});

	socket.on('disconnect', function() {
		// Handle what to do when disconected
		// console.log(socket.id);
		// disconnectUser(socket.id);
	});

	socket.on('reconnect', function() {
		// Handle what to do when reconnect
		// console.log('Got reconnected! new ');
		// console.log(socket.id);
	});
};
// Register new user example
function registerUser(user, socket_id) {
	var session = new Session({
		user_id: user._id,
		email: user.email,
		connection_date: new Date(),
		socket_id: socket_id,
		from_device: user.from_device
	})
	session.save(function(err) {
		if (err) {
			console.log("Ocurrió un error al guardar la sesión");
			return false;
		}
		return true;
	});
}

// Remove user example
function removeUser(user_id, socket_id) {
	Session
		.findOne({
			user_id: user_id,
			socket_id: socket_id
		}, function(err, session) {
			if (err) {
				console.log("Ocurrió un error, la sesión no existe");
				return false;
			}
			if (session) {
				console.log("Se ha encontrado la sesión y se va a remover");
				session.remove(function(error) {
					if (error) {
						console.log("Ocurrió un error al eliminar la sesión");
						return false;
					} else {
						console.log("La sesión ya no existe");
						return true;
					}
				})
			}
		})
}

// Disconnect user example
function disconnectUser(socket_id) {
	Session
		.findOne({
			socket_id: socket_id
		}, function(err, session) {
			if (err) {
				console.log("Ocurrió un error, el socket no existe");
				return false;
			}
			if (session) {
				session.remove(function(error) {
					if (error) {
						return false;
					} else {
						console.log("El socket finalizo");
						return true;
					}
				})
			}
		})
}
