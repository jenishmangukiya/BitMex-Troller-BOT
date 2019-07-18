var request = require('request');
var crypto = require('crypto');

var apiKey = process.env.API_KEY;
var apiSecret = process.env.API_SECRET;

//Email Read #Start
var Imap = require('imap'),
    inspect = require('util').inspect;
//var fs = require('fs'), fileStream;

var clsdata=[]; //coin long short data
var Cpair=['XBTUSD','ETHUSD','XRPU19','LTCU19','BCHU19','EOSU19','TRXU19','ADAU19']; //coin pairs

var eData // temp email data

var imap = new Imap({
	user: process.env.EMAIL_ID,
	password: process.env.EMAIL_PWD,
	host: 'imap.gmail.com',
	port: 993,
	tls: true
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
		//XBTUSD
		openInbox(function(err, box) {
		  if (err) throw err;
		
		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[0]+' Go Long" OR subject:"'+Cpair[0]+' Go Short"} ']], function(err, results) {
			if (err) throw err;
			
			var f = imap.fetch(results, { bodies: '' });

			f.on('message', function(msg, seqno) {
				
				//console.log('Message #%d', seqno);
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//console.log(prefix + 'Body');
					//stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
					
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
				/*
				msg.once('attributes', function(attrs) {
					//console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
				});
				  
				msg.once('end', function() {
					//console.log(prefix + 'Finished');
				});*/
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
			  //console.log('Done fetching all messages!');
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[0]+' Go short').toUpperCase())!=-1)
					clsdata[0]=[Cpair[0],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[0]+' Go long').toUpperCase())!=-1)
					clsdata[0]=[Cpair[0],'Long']
			  imap.end();
			});
		  });
		});

		//ETHUSD
		openInbox(function(err, box) {
		  if (err) throw err;

		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[1]+' Go Long" OR subject:"'+Cpair[1]+' Go Short"} ']], function(err, results) {
			if (err) throw err;

			var f = imap.fetch(results, { bodies: '' });
			
			f.on('message', function(msg, seqno) {
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[1]+' Go short').toUpperCase())!=-1)
					clsdata[1]=[Cpair[1],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[1]+' Go long').toUpperCase())!=-1)
					clsdata[1]=[Cpair[1],'Long']
			  imap.end();
			});
		  });
		});
		
		//XRPU19
		openInbox(function(err, box) {
		  if (err) throw err;

		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[2]+' Go Long" OR subject:"'+Cpair[2]+' Go Short"} ']], function(err, results) {
			if (err) throw err;

			var f = imap.fetch(results, { bodies: '' });
			
			f.on('message', function(msg, seqno) {
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[2]+' Go short').toUpperCase())!=-1)
					clsdata[2]=[Cpair[2],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[2]+' Go long').toUpperCase())!=-1)
					clsdata[2]=[Cpair[2],'Long']
			  imap.end();
			});
		  });
		});
		
		//LTCU19
		openInbox(function(err, box) {
		  if (err) throw err;

		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[3]+' Go Long" OR subject:"'+Cpair[3]+' Go Short"} ']], function(err, results) {
			if (err) throw err;

			var f = imap.fetch(results, { bodies: '' });
			
			f.on('message', function(msg, seqno) {
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[3]+' Go short').toUpperCase())!=-1)
					clsdata[3]=[Cpair[3],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[3]+' Go long').toUpperCase())!=-1)
					clsdata[3]=[Cpair[3],'Long']
			  imap.end();
			});
		  });
		});
		
		//BCHU19
		openInbox(function(err, box) {
		  if (err) throw err;

		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[4]+' Go Long" OR subject:"'+Cpair[4]+' Go Short"} ']], function(err, results) {
			if (err) throw err;

			var f = imap.fetch(results, { bodies: '' });
			
			f.on('message', function(msg, seqno) {
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[4]+' Go short').toUpperCase())!=-1)
					clsdata[4]=[Cpair[4],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[4]+' Go long').toUpperCase())!=-1)
					clsdata[4]=[Cpair[4],'Long']
			  imap.end();
			});
		  });
		});
		
		//EOSU19
		openInbox(function(err, box) {
		  if (err) throw err;

		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[5]+' Go Long" OR subject:"'+Cpair[5]+' Go Short"} ']], function(err, results) {
			if (err) throw err;

			var f = imap.fetch(results, { bodies: '' });
			
			f.on('message', function(msg, seqno) {
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[5]+' Go short').toUpperCase())!=-1)
					clsdata[5]=[Cpair[5],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[5]+' Go long').toUpperCase())!=-1)
					clsdata[5]=[Cpair[5],'Long']
			  imap.end();
			});
		  });
		});
		
		//TRXU19
		openInbox(function(err, box) {
		  if (err) throw err;

		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[6]+' Go Long" OR subject:"'+Cpair[6]+' Go Short"} ']], function(err, results) {
			if (err) throw err;

			var f = imap.fetch(results, { bodies: '' });
			
			f.on('message', function(msg, seqno) {
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[6]+' Go short').toUpperCase())!=-1)
					clsdata[6]=[Cpair[6],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[6]+' Go long').toUpperCase())!=-1)
					clsdata[6]=[Cpair[6],'Long']
			  imap.end();
			});
		  });
		});
		/*
		//ADAU19
		openInbox(function(err, box) {
		  if (err) throw err;

		imap.search(['ALL',['X-GM-RAW','{subject:"'+Cpair[7]+' Go Long" OR subject:"'+Cpair[7]+' Go Short"} ']], function(err, results) {
			if (err) throw err;

			var f = imap.fetch(results, { bodies: '' });
			
			f.on('message', function(msg, seqno) {
			  
				var prefix = '(#' + seqno + ') ';
				  
				msg.on('body', function(stream, info) {
					//last email data storing
						var buffer = '';
						stream.on('data', function(chunk) {
							buffer += chunk.toString('utf8');
						});
						stream.once('end', function() {
							eData=(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));	
						});
				});
			});
			f.once('error', function(err) {
				console.log('Fetch error: ' + err);
			});
			
			f.once('end', function() {
				if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[7]+' Go short').toUpperCase())!=-1)
					clsdata[7]=[Cpair[7],'Short']
				else if((eData.toUpperCase()).search(('TradingView Alert: '+Cpair[7]+' Go long').toUpperCase())!=-1)
					clsdata[7]=[Cpair[7],'Long']
			  imap.end();
			});
		  });
		});		
		*/	
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
	//console.log(clsdata);
	
	var temp_str="📢📢📢\n🚨Ape[x] bot bias🚨";
	for(i=0;i<clsdata.length;i++)
	{
		temp_str+="\n";
		temp_str+=clsdata[i][0]+" : ";
		if(clsdata[i][1]==='Long')
			temp_str+="📈Long🐮";
		else if(clsdata[i][1]==='Short')
			temp_str+="📉Short🐻";
			
	}

	var verb = 'POST',
	  path = '/api/v1/chat',
	  expires = Math.round(new Date().getTime() / 1000) + 60, // 1 min in the future
	  data = {message:temp_str,channelID:1};

	// Pre-compute the postBody so we can be sure that we're using *exactly* the same body in the request
	// and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
	var postBody = JSON.stringify(data);

	var signature = crypto.createHmac('sha256', apiSecret).update(verb + path + expires + postBody).digest('hex');

	var headers = {
	  'content-type' : 'application/json',
	  'Accept': 'application/json',
	  'X-Requested-With': 'XMLHttpRequest',
	  // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
	  // https://www.bitmex.com/app/apiKeysUsage for more details.
	  'api-expires': expires,
	  'api-key': apiKey,
	  'api-signature': signature
	};

	const requestOptions = {
	  headers: headers,
	  url:'https://www.bitmex.com'+path,
	  method: verb,
	  body: postBody
	};

	request(requestOptions, function(error, response, body) {
	  if (error) { console.log(error); }
		console.log(body);
	});
});
 
imap.connect();
//Email Read #End