var models  = require('../models');


//Saving record
function addRecord(req,res,sendResponse){
	//saving it
	models.teams.create({
		team_name: req.body.teamName;
	}).then(function(team){
		sendResponse(null,team,res);
	}).catch(function(err){
		sendResponse(err,null,res)
	});
}

module.exports={
	execute:function(req,sendResponse){
		this.addRecord(req,res,sendResponse);
	}
}