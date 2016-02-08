"use strict";

var contextPath = process.cwd();
console.log(contextPath);
var create_service=require(contextPath + "/services/services_operations/create.js");
var update_service=require(contextPath + "/services/services_operations/update.js");
var delete_service=require(contextPath + "/services/services_operations/delete.js");
var get_service=require(contextPath + "/services/services_operations/get.js");

function sendResponse(err,result,res){
	if(!err){
		res.jsonp(result);
	}
	else{
		try{
			res.status(400);
			res.jsonp(err);
		}
		catch(e){
			res.status(400);
			res.jsonp("{error accured please try again later}")
		}
		
	}
}
module.exports={
	create: function(req,res,next)
	{
		create_service.execute(req,res,sendResponse);
	},	
	update: function(req,res,next)
	{
		update_service.execute(req,res,sendResponse);
	},
	delete: function(req,res,next)
	{
		delete_service.execute(req,res,sendResponse);
	},
	get: function(req,res,next)
	{
		get_service.execute(req,res,sendResponse);
	}
}