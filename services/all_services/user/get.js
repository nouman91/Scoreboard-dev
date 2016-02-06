var models  = require('../models');

function getRecords(res,sendResponse){
	models.teams.findAll()
	.then(function(teams){
		sendResponse(null,teams,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

function getUser(req,res,sendResponse){
	models.teams.findById(req.body.useName)
	.then(function(user){
		if(user.password===req.body.password){
			sendResponse(null,user,res)
		}
		else{
			sendResponse("Wrong password",user,res);
		}
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}
module.exports={
	execute:function(req,res,sendResponse){
		this.getRecords(res,sendResponse);
	}
}