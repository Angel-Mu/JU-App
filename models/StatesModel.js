var mongoose = require('mongoose'),
		Schema = mongoose.Schema;
 
var ExternalPlatform = new Schema({
	name 	: {type:String},
	_id 	: {type:String}
})

var StateModel = new Schema({
	_id								: { type:  Number },
	country_id				: { type:  Number },
	name							: { type: String },
	abbr							: { type: String },
	externalPlatforms	: [ExternalPlatform]
});
 
module.exports = mongoose.model('States', StateModel);