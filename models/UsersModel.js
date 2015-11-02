// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// module.exports allows us to pass this to other files when it is called
var UserModel = new Schema({
	// User name
	name						: {type: String, default: ''},
	lastname				: {type: String},
	lastname2				: {type: String},
	fullname				: {type: String},
	// User email  -  required for create an account
	email						: {type: String, lowercase: true, trim: true, unique:true, required:true},
	// Gender of the user registered
	gender					: {type: String, enum:["MALE", "FEMALE"]},
	// Age calculated with a mongoose middleware --- TODO
	age							: {type: Number},
	// Required for token expiration on app... --- TODO redirect to a page for login on invalid token
	exp 						: {type: Number},
	// Who creates the new user
	created_by			: {type: String, ref: 'Users'},
	// Date when was registered
	creation_date		: {type: Date, default: Date.now},
	// When was the las update
	last_modified_date: {type: Date, default: Date.now},
	// Assigned States
	state 					:{
											_id					:{type: Number, ref:"States"},
											name				:{type: String}
										},
	country 					:{
											_id					:{type: Number, ref:"Countries"},
											name				:{type: String}
										},

	// User profile
	profile 				: {
											_id					:{type: String, ref:"Profiles"},
											name				:{type: String}
										},
	// Token created for restore password through email notification
	resetPasswordToken :String,
	// Time to take token for expiration
	resetPasswordExpires :Date
});

module.exports = mongoose.model('Users', UserModel);
UserModel.pre('save', function(next) {
		var fullName = "";
		if ( this.name 					!= '' ) fullName += this.name;
		if ( this.lastname 			!= '' ) fullName += ' ' + this.lastname;
		if ( this.lastname2 		!= '' ) fullName += ' ' + this.lastname2;
		this.fullname = fullName;
		this.last_modified_date = new Date();
		next();
});
