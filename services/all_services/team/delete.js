var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function deleteRecords(req,res,sendResponse){
	models.teams.destroy({
		where:{
			team_name:req.body.teams
		}
	})
	.then(function(team){
		models.teams.findAll().
		then(function(teams){
			sendResponse(null,teams,res);
		})
		.catch(function(err){
			sendResponse(err,null,res);
		})
		
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		deleteRecords(req,res,sendResponse);
	}
}