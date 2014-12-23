/**
 * New node file
 */
var express = require('express');
var fs = require('fs');
var IOUtil = function(){
		var write = function(fileName, str){
			fs.writeFile(fileName, str, function (err) {
			if (err){
				throw err;
			}
			console.log('It\'s saved!');
			});
		};
		
		var append = function (fileName, str){
			fs.appendFile(fileName, '\n'+str, function (err) {
				if (err){
					throw err;
				}
				console.log('It\'s appended!');
				}
			);
		};
		
		var read = function(fileName, callBack){
			fs.exists(fileName, function (exists) {
				console.log('exists:  '+exists);
				exists ? fs.readFile(fileName,function(err,data){
					callBack(true, data);
				}) : callBack(false);
			});			

		};
		
		
		
		return {
			writeFile: function(fileName, str){
				fs.exists(fileName, function (exists) {
						console.log('exists:  '+exists);
						exists ? append(fileName, str) : write(fileName, str);
				});
			},
			
			readFile: function(fileName, callBack){
				read(fileName, callBack);
			},
			
			removeFile: function(fileName, callBack){
				fs.unlink(fileName, function(err){
					callBack(err);	
				});
			}
		};
};

module.exports = new IOUtil();