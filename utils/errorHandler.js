'use strict';
// Error handling middleware
var log = require('../config/logger.js');

exports.errorHandler = function(err, req, res, next) {	
	// Handle a basic Error, You can configure your own error with the provided functions of this file
	// Handle an unauthorized request
	if(err.name){
		switch(err.name){
			case "ValidationError":
				log.error(err.errors);
				res.status(400).send({error:'ValidationError', msg:"Error de validación"});
				break;
			case "UnauthorizedError":
				log.error(err.name);
				log.debug(err.stack);
				res.status(401).send({error:'Unauthorized', msg:"No autorizado."});
				break;
			default:
				log.error(err.name);
				log.error(err);
				res.status(500).send({error: err, msg: err.message});
				break;
		}
		return;
	}else{
		switch(err.message){
			case "NOT FOUND":
				res.status(404).send({msg:err.message});
				break;
			default:
				log.error(err.stack);
				res.status(500).send({msg: err.message});
				break;
		}
		return;
	}
}
