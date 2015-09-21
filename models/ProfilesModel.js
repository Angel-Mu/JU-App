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
	status					:{type:Boolean, default:true}
});