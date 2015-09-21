var nodemailer = require('nodemailer');
var fs = require('fs');
var ejs = require('ejs');

// Only needs to be instanced in a function when you want to send a email message through node-email-templates
// Example
// var MailInstance = require('../utils/mailInstance.js');
// var mailInstance = new MailInstance('name@example.com', 'Your Subject', 'Template to send', data);
// mailInstance.send(function (err){
// 	if(err){
// 		done(err);
// 	}
// 	done(null, {info:"Operación completada", subject:"Mensaje enviado - Invitación a proveedor"});
// });

var MailInstance = function (to, subject, template, content){
	this.to = to;
	this.subject = subject;
	this.template = template;
	this.content = content;
};

// Templates will be rendered with Ember.js, you can specify the values that you want as dinamic data
// var in braces {{}} will be replaced
// template must have .ejs extension
ejs.open = '{{';
ejs.close = '}}';

var transporter = nodemailer.createTransport({
	// Your email account data
	// Needs a valid pop or smtp port, check your email configuration
	host: '',
		port: 587, 
	auth: {
		user: '',
		pass: ''
	}
});

MailInstance.prototype.send = function (callback){
	var template = process.cwd() + '/mail_templates/' +this.template+'.ejs';
	var content = this.content;
	var to = this.to;
	var subject = this.subject;
	fs.readFile(template, 'utf8', function (err, file){
		if(err) return callback (err);
		var html = ejs.render(file, content);
		var mailOptions = { 
			from: '', // Nombre - Example <youname@example.com>
			to: to,
			subject: subject,
			html: html
		};
		transporter.sendMail(mailOptions, function (err, info){
			if(err) return callback(err);
			console.log(info);
			callback();
		});
	});
};

module.exports = MailInstance;