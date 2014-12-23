var express = require('express');
var fs = require('fs');
/* require XLSX */
var XLSX = require('xlsx');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


function a()
{
	
	console.log('test................');
	
	/* original data */
	var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar","0.3"], ["baz", null, "qux"]];
	var ws_name = "SheetJS";

	/* set up workbook objects -- some of these will not be required in the future */
	var wb = {};
	wb.Sheets = {};
	wb.Props = {};
	wb.SSF = {};
	wb.SheetNames = [];

	/* create worksheet: */
	var ws = {};

	/* the range object is used to keep track of the range of the sheet */
	var range = {s: {c:0, r:0}, e: {c:0, r:0 }};

	/* Iterate through each element in the structure */
	for(var R = 0; R !== data.length; ++R) {
	  if(range.e.r < R) 
	  {
		  range.e.r = R;
	  }
	  
	  for(var C = 0; C !== data[R].length; ++C) {
	    if(range.e.c < C) 
	    {
	    	range.e.c = C;
	    }

	    /* create cell object: .v is the actual data */
	    var cell = { v: data[R][C] };
	    if(cell.v === null) 
	    {
	    	continue;
	    }

	    /* create the correct cell reference */
	    var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

	    /* determine the cell type */
	    if(typeof cell.v === 'number') 
	    {
	    	cell.t = 'n';
	    }
	    else if(typeof cell.v === 'boolean') 
	    {
	    	cell.t = 'b';
	    }
	    else 
	    {
	    	cell.t = 's';
	    }

	    /* add to structure */
	    ws[cell_ref] = cell;
	  }
	}
	ws['!ref'] = XLSX.utils.encode_range(range);

	/* add worksheet to workbook */
	wb.SheetNames.push(ws_name);
	wb.Sheets[ws_name] = ws;

	/* write file */
	XLSX.writeFile(wb, 'test.xlsx');
	
	
	console.log('test................finish!');
	

}

function read()
{
	var workbook = XLSX.readFile('test.xlsx');
	//var sheetName = 'SheetJS';
	//ws = wb.Sheets[sheetName];
	//console.log('ws:  '+ws);
	
	//var sheetName_List =  XLSX.SheetNames;
	//var sheet1 = ws.Sheets;
	//var SheetJS = sheet1.SheetJS;
	//console.log('XLSX:  '+ JSON.stringify(SheetJS));
	
	var sheet_name_list = workbook.SheetNames;
	sheet_name_list.forEach(function(y) {
	  var worksheet = workbook.Sheets[y];
	  for (z in worksheet) {
	    if(z[0] === '!') continue;
	    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
	  }
	});
}

router.post('/', function(req, res) {
	
	 var userName = req.body.username;
	 var password = req.body.password;
	 console.log('username: '+ userName);
	 console.log('password: '+ password);
	 
	 
	 
	 
	 //a();
	 read();
	 
	 res.send('respond with a resource');
});

function writeFile()
{
	
	fs.writeFile('message.txt', 'Hello Node', function (err) {
		  if (err){
			  throw err;
		  }
		  console.log('It\'s saved!');
		});
}

function appendFile(userName, password){
	fs.appendFile('message.txt', '\n\''+userName+'\'', function (err) {
		  if (err) throw err;
		  console.log('The "data to append" was appended to file!');
		});
}


router.post('/add', function(req, res){
	 var userName = req.body.username;
	 var password = req.body.password;
	 console.log('username: '+ userName);
	 console.log('password: '+ password);
	 
	 fs.exists('message.txt', function (exists) {
		 console.log('exists:  '+exists);
		  exists ? appendFile(userName) : writeFile();
		});
	 
	 
	
});



module.exports = router;
