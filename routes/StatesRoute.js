// EntitiesRoute.js
// @maindescription= Este servicio está basado en el modelo de [Estados](#modelo).
// @author= Mauricio Zarate Barrera <morrisgrill@hotmail.com>
//======================================================================================
// Servicio importado
module.exports = function(app, router) {

	var Entity = require('../models/StatesModel.js'),
		util = require("util"),
		expressValidator = require("express-validator"),
		async = require("async"),
		expressJwt = require('express-jwt');

	// Encrypt specific routes
	router.use('/api', expressJwt({
		secret: app.secret
	}));

	//GET - Return all entities in DB
	findAllEntities = function(req, res) {
		console.log("GET - /entities");
		// @description= Obtiene una lista de todas las entidades federativas registradas
		// @example= /entities

		Entity
			.find()
			.sort('_id')
			.exec(function(err, entities) {
				if (err) return res.send(400, err);

				return res.send(entities);

			});
	};

	findById = function(req, res) {
		console.log("GET - /entity/:id");
		// @description= Obtiene una entidad federativa
		// @example= /states
		// @param= String, :id, UUID, Filtra por el UUID
		return Entity.findById(req.params.id, function(err, entity) {
			if (!entity) {
				res.statusCode = 404;
				return res.send({
					error: 'Not found'
				});
			}
			if (!err) {
				return res.send(entity);
			} else {
				res.statusCode = 500;
				console.log('Internal error(%d): %s', res.statusCode, err.message);
				return res.send({
					error: 'Server error'
				});
			}
		});
	};

	addEntities = function(req, res) {
		console.log('POST - /Entities');
		// @description= Inserta un estado
		// @example= /states

		var entitiesArr = [];
		if (req.body instanceof Array) {
			entitiesArr = req.body;
		} else {
			entitiesArr.push(req.body);
		}

		async.each(entitiesArr, function(item, callback) {

			var entity = new Entity({
				_id: item._id,
				name: item.name,
				abbr: item.abbr
			});


			entity.save(function(err) {
				if (!err) {
					return res.send({
						status: 'OK',
						entity: entity
					});
					callback();
				} else {
					console.log(err);
					if (err.name == 'ValidationError') {
						res.statusCode = 400;
						res.send({
							error: 'Validation error'
						});
					} else {
						res.statusCode = 500;
						res.send({
							error: 'Server error'
						});
					}
					console.log('Internal error(%d): %s', res.statusCode, err.message);
					callback();
				}
			});
		});
		res.send(201);
	};



	//POST - Insert a new Entity in the DB
	addEntity = function(req, res) {
		console.log('POST - /Entity');
		console.log(req.body);
		console.log("Hello");
		if (req.body instanceof Array) {
			addEntities(req, res);
			return;
		}



		req.checkBody('name', 'La entidad federativa no debe estar vacía').notEmpty();

		var errors = req.validationErrors();

		if (errors) {
			res.send('invalid' + util.inspect(errors), 400);
			return;
		}
		console.log("LLEGA");

		var entity = new Entity({
			_id: req.body._id,
			name: req.body.name,
			abbr: req.body.abbr
		});


		entity.save(function(err) {
			if (!err) {
				console.log("Entity created");
				return res.send({
					status: 'OK',
					entity: entity
				});
			} else {
				console.log(err);
				if (err.name == 'ValidationError') {
					res.statusCode = 400;
					res.send({
						error: 'Validation error'
					});
				} else {
					res.statusCode = 500;
					res.send({
						error: 'Server error'
					});
				}
				console.log('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
		res.send(entity);
	};

	//PUT - Update a register already exists
	updateEntity = function(req, res) {
		console.log("PUT - /Entity/:id");
		// @description= Modifica un estado federativo
		// @example= /states
		// @param= String, :id, UUID, Filtra por UUID
		console.log(req.body);

		return Entity.findById(req.params.id, function(err, entity) {
			if (!entity) {
				res.statusCode = 404;
				return res.send({
					error: 'Not found'
				});
			}
			if (req.body._id != null) Entity.body._id = req.body._id;
			if (req.body.name != null) Entity.body.name = req.body.name;
			if (req.body.abbr != null) Entity.body.abbr = req.body.abbr;

			return Entity.save(function(err) {
				if (!err) {
					console.log('Updated');
					return res.send({
						status: 'OK',
						entity: entity
					});
				} else {
					if (err.name == 'ValidationError') {
						res.statusCode = 400;
						res.send({
							error: 'Validation error'
						});
					} else {
						res.statusCode = 500;
						res.send({
							error: 'Server error'
						});
					}
					console.log('Internal error(%d): %s', res.statusCode, err.message);
				}

				res.send(entity);
			});
		});
	}

	//Link routes and functions
	router.get('/api/states', findAllEntities);
	router.get('/api/states/:id', findById);
	router.post('/api/states', addEntity);
	router.put('/api/states/:id', updateEntity);
}
