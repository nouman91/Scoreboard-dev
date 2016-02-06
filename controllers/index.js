"use strict";

var contextPath = process.cwd();
var create_service=require(contextPath + "/services/services_operations/create.js");
var update_service=require(contextPath + "/services/services_operations/update.js");
var delete_service=require(contextPath + "/services/services_operations/delete.js");
var get_service=require(contextPath + "/services/services_operations/get.js");

module.exports={
	sendResponse: function(err,result,res){

	},
	create: function(req,res,next)
	{
		create_service.execute(req,res,next,sendResponse);
	},	
	update: function(req,res,next)
	{
		update_service.execute(req,res,next,sendResponse);
	},
	delete: function(req,res,next)
	{
		delete_service.execute(req,res,next,sendResponse);
	},
	get: function(req,res,next)
	{
		get_service.execute(req,res,next,sendResponse);
	}
}