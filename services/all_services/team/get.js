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


module.exports={
	execute:function(res,sendResponse){
		this.getRecords(res,sendResponse);
	}
}