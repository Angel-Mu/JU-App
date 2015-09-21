var path = __dirname.split("/config");
path = path[0];
var bunyanOpts = {
		name: 'JUMPERSUP',
		streams: [
			{
					level: 'error',
					path: path+'/logs/error.log',
					period: '1w',
					count: 20,
			},
			{
					level: 'info',
					path: path+'/logs/info.log',
					period: '1w',
					count: 20,
			},
			{
					level: 'warn',
					path: path+'/logs/warn.log',
					period: '1w',
					count: 20,
			},
			{
					level: 'debug',
					stream: process.stdout
			}
		]
};
var bunyan = require('bunyan');
var log = bunyan.createLogger(bunyanOpts);

exports.info = function(params){
	log.info(params);
}

exports.error = function(params){
	log.error(params);
}

exports.warn = function(params){
	log.warn(params);
}

exports.debug = function(params){
	log.debug(params);
}

exports.console = function(params){
	console.log(params);
}