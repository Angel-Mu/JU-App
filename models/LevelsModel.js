// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Levels', {
	_id							:{type:String},
	name						:{type:String},
	description			:{type:String},
	app							:{type:String}
});

// [
// 	{
// 		"_id":"LEVEL_01",
// 		"name":"Persona física",
// 		"description":"Persona física con actividad empresarial.",
// 		"app":"JUMPERSUP"
// 	},
// 	{
// 		"_id":"LEVEL_02",
// 		"name":"Empresa",
// 		"description":"Vendedor con actividad comercial.",
// 		"app":"JUMPERSUP"
// 	}
// ]