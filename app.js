
/** 
	app.js
	@author: @umeshkumar21
	@description: Manage Your Personal Music Library 
**/
var express = require('express');
var fs = require('fs');


var app = express();

app.use('/public', express.static(__dirname + '/public'));


app.get('/',function(req,res){
	
	return res.redirect('/public/home.html');

});

app.listen(process.env.PORT || 3003,function(){
	console.log('App listening on port 3003!');
});

//for streaming

app.get('/music', functiproon(req,res){
	
	var fileId = req.query.id; 
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	
	});
});

//for downloading

app.get('/download', function(req,res){
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
});
