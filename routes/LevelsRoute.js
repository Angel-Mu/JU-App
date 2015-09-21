module.exports = function(app, router) {
	var Level 					= require('../models/LevelsModel.js'),
			log 						= require('../config/logger.js'),
			expressJwt 			= require('express-jwt');

	// Encrypt specific routes
	router.use('/api', expressJwt({secret: app.secret}));
	
	router.route('/api/levels')
		.get(function (req, res, next) {
			Level.find(function(err, levels) {
				if (err)
					next(err);
				res.status(200).send(levels);
				// next();
			});
		})
		.post(function (req, res, next){
			console.log(req.body);
			Level.create(req.body, function(err, created){
				if(err){
					next(err);
				}else{
					log.info("Levels creados "+JSON.stringify(created));
					res.status(201).send(created);
					// next(null, created);
				}
			});
		});

	router.route('/api/levels/:id')
		.get(function (req, res, next) {
			Level.findById(req.params.id, function(err, data) {
				if (err){
					next(err);
				}
				if(!data){
						next(new Error("NOT FOUND"));
						return;
					}
				res.status(200).send(data); // return user in JSON format
				// next();
			});
		})
		.put(function (req, res, next){
			if(req.body instanceof Array){
				next(new Error("Body error - Expected an object, received Array"));
				return;
			}
			Level.findOneAndUpdate({_id:req.params.id},{$set:req.body}, function(err, updated){
				if(err){
					next(err);
				}else{
					if(!updated){
						next(new Error("NOT FOUND"));
						return;
					}
					log.info("document to update " + JSON.stringify(updated));
					res.status(200).send(updated);
					// next();
				}
			});
		})
		.delete(function (req, res, next){
			Level.findOneAndRemove({_id:req.params.id}, function(err, removed){
				if(err){
					next(err);
				}else{
					if(!removed){
						next(new Error("NOT FOUND"));
					}
					log.info("se ha removido module "+JSON.stringify(removed));
					res.status(200).send(removed);
					// next();
				}
			});
		});
};