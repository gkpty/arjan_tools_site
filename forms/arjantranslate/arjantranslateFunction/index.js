const { v4 } = require('uuid');
const axios = require('axios').default;
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var Arjan = require('arjan-translate')
var todate = new Date().toISOString()

exports.handler = (event, context, callback) => {
	let secret = process.env.RECAPTCHA_SECRET;
	let response = event.captcha;
	let url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secret + '&response=' + response;
	axios.post(
		url,{},{headers: {"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"}}
	).then((response)=> {
		if(response.data.success){
			let uid = v4();
			let file_siz = event.file.length.toString();
			let name = event.from;
			let html = event.file;
			let translation = `${event.to}.html`;
			let dbobj = {
				id:{S:uid},
				origin:{S:event.from},
				destination:{S:event.to},
				file_size:{S:file_siz},
				created_at:{S:todate}
			};
			let params = {
				Item: dbobj, 
				TableName: "arjantranslate",
			};
			dynamodb.putItem(params, function(err, data) {
				if (err) callback(err);
				else {
					Arjan.CreateLocale(html, name, event.from, event.to, function(err, data){
						if(err) callback(err);
						else{
							var origin_html = data.html;
							Arjan.TranslateLocale(data.locale, name, event.from, event.to, data.size, function(err, data){
								if(err) callback(err);
								else{
									var translated_locale = JSON.stringify(data);
									Arjan.TranslateHtml(name, origin_html, translation, data, event.to, function(err, data){
										if(err) callback(err);
										else {
											console.log('All Done!');
											callback(null, {"body":{"html":data, "locale":translated_locale}});
										}
									})
								}
							})
						}
					})
				}
			});
		}
		else callback('invalid recaptcha response');
	}).catch((error) => {callback(error)});	
};
