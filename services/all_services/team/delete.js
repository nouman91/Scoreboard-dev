var models  = require('../models');

function deleteRecords(req,res,sendResponse){
	models.teams.destroy({
		where:{
			team_name:req.body.teamName
		}
	})
	.then(function(team){
		sendResponse(null,team,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		this.deleteRecords(req,res,sendResponse);
	}
}