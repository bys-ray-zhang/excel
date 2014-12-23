var express = require('express');
var router = express.Router();
var IOUtil = require('./IOUtil');
var infos = null;
var fileName = '.info';

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/model', function(req, res) {
	res.render('info-model');
});

router.get('/load', function(req, res){
	IOUtil.readFile(fileName, function(err, data){
		if(!err)
		{
			return [];
		}
		var d = data.toString();
		var array = d.split('\n');
		infos = array;
		res.send(array);
	});
});

router.post('/add', function(req, res){
	var body = JSON.stringify(req.body);
	IOUtil.writeFile(fileName, body);
	if(infos === null)
	{
		infos = [];
		infos.push(body);
	}
	else
	{
		infos.push(body);
	}
	res.send(true);
});

router.post('/update', function(req, res){
	IOUtil.removeFile(fileName, function(err){
		if(err)
			return;
		var body = JSON.stringify(req.body);
		var id = req.body.id;
		var index = 0;
		for (var i = 0; i < infos.length; i++)
		{
			var tmp = infos[i];
			if (typeof infos[i] == 'string')
			{
				tmp = JSON.parse(tmp);	
			}
			
			if (tmp.id == id)
			{
				index = i;
				break;
			}
		}
		infos[index] = body;
		writeFile();
		res.send(true);
	});
});

router.get('/remove', function(req, res){
		IOUtil.removeFile(fileName, function(err){
			if(err)
				return;
			var id = req.query.id;
			var index = 0;
			for (var i = 0; i < infos.length; i++)
			{
				//console.log('infos[i]:  '+infos[i]);
				var tmp = infos[i];
				if (typeof infos[i] == 'string')
				{
					tmp = JSON.parse(tmp);	
				}
				if (tmp.id == id)
				{
					index = i;
					break;
				}
			}
			
			infos.splice(index, 1);
			writeFile();
			res.send(true);
		});
});

function writeFile()
{
	var strs = [];
	if (infos && infos.length > 0)
	{
		for (var i = 0; i < infos.length; i++)
		{
			var info = infos[i];
			//console.log('infos:  '+info);
			if (typeof info == 'object')
			{
				strs.push(JSON.stringify(info));
			}
			strs.push(info);
		}
		var a = infos.join('\n');
		//console.log('a:  '+ a);
		IOUtil.writeFile(fileName, a);
	}
}

module.exports = router;
