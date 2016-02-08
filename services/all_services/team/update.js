var contextPath=process.cwd();
var models  = require(contextPath + '/models');


function updateRecord(req,res,sendResponse){

	models.teams.update({ team_name: req.body.teamName }, { where: {team_name: req.body.oldTeamName} })
	.then(function(team){
		sendResponse(null,team,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		updateRecord(req,res,sendResponse);
	}
}