const { v4 } = require('uuid');
const axios = require('axios').default;
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var Arjan = require('arjan-localize')
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
			let html = event.file;
			let dbobj = {
				id:{S:uid},
				origin:{S:event.from},
				destination:{S:event.to},
				email:{S:event.email},
				file_size:{S:file_siz},
				created_at:{S:todate}
			};
			let params = {
				Item: dbobj, 
				TableName: "arjantranslate",
			};
			dynamodb.putItem(params).promise().then(()=> {
				Arjan.CreateLocale(html).then((locale) => {
					let origin_html = locale.html;
					Arjan.TranslateLocale(locale.locale, event.from, event.to).then((data)=>{
						let locale_string = JSON.stringify(data);
						Arjan.TranslateHtml(origin_html, data).then((new_html) => {
							console.log('All Done!');
							callback(null, {"body":{"html":new_html, "locale":locale_string}});
						}).catch(err=> callback(err))
					}).catch(err=> callback(err))
				}).catch(err=> callback(err))
			}).catch(err=> callback(err))		
		}
		else callback('invalid recaptcha response');
	}).catch((error) => {callback(error)});	
};
