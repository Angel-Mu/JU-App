// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Profiles', {
	_id							:{type:String},
	name						:{type:String},
	// permissions			:[
	// 										{
	// 											module_id				:{type:String, ref:'Modules'},
	// 											privileges			:{
	// 																					create			:{type:Boolean},
	// 																					read				:{type:Boolean},
	// 																					update			:{type:Boolean},
	// 																					remove			:{type:Boolean}
	// 																				}
	// 										}
	// 								],
	status					:{type:Boolean, default:true},
	description			:{type:String},
});


// [
// 	{
// 		"_id":"COMPANY",
// 		"name":"PyME",
// 		"description":"Empresas con registro federal de contribuyentes - PyME"
// 	},
// 	{
// 		"_id":"MORAL_PERSON",
// 		"name":"Persona moral",
// 		"description":"Persona moral, sin ningún tipo de registro como empresa"
// 	},
// 	{
// 		"_id":"PHYSIC_PERSON",
// 		"name":"Persona física",
// 		"description":"Persona física con actividad empresarial"
// 	},
// 	{
// 		"_id":"ENTERPRISE",
// 		"name":"Compañía",
// 		"description":"Empresas grandes con registro federal de contribuyentes"
// 	}
// ]