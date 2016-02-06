var models  = require('../models');

function updateRecord(req,res,sendResponse){
	models.teams.update(
		{
			team_name:req.body.teamName
		},
		{
			team_name:req.body.teamName
		}
	)
	.then(function(team){
		sendResponse(null,team,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		this.updateRecord(req,res,sendResponse);
	}
}