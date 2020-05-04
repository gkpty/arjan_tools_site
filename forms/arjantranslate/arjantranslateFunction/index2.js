
	const uuidv1 = require('uuid/v1');
	const axios = require('axios').default;
	var AWS = require('aws-sdk');
	var ses = new AWS.SES({apiVersion: '2010-12-01'});
	var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
	var todate = new Date().toISOString()

	exports.handler = (event, context, callback) => {
		let obj = {"id":"id","from":"from","to":"to","file":"file","email":"email"}; 
		let uid = uuidv1();
		let file_siz = event.file.length
		//add date, email, origin lang, dest lang and translation length to the database table
		let dbobj = {
			id:{S:uid},
			origin:{S:event.from},
			destination:{S:event.to},
			file_size:{S:file_siz},
			created_at:{S:todate}
		};
		Object.keys(obj).map(function(key, index) {
			obj[key] = event[key];
			dbobj[key] = {S:event[key]};
		})
		obj['id'] = uid;
		dbobj['id'] = {S:uid};
		let params = {
			Item: dbobj, 
			TableName: "arjantranslate",
		};
		dynamodb.putItem(params, function(err, data) {
			if (err) callback(err);
			else callback(null, {body: 'Success'})
		});
		
	};
	