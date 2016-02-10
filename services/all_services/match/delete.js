var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function deleteMatches(req,res,sendResponse){
	models.matches.destroy({
		where:{
			match_id:req.body.matches
		}
	})
		.then(function(match){
			models.matches.findAll()
			.then(function(matches){
				sendResponse(null,matches,res);
			})
			.catch(function(err){
				sendResponse("Matchs deleted successfully but there was some error in getting list of saved matches please referesh page",null,res);
			})
		})
		.catch(function(err){
			sendResponse(err,null,res);
		})
}
module.exports={
	execute:function(req,res,sendResponse){
		deleteMatches(req,res,sendResponse);
	}
}