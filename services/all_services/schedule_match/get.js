var contextPath=process.cwd();
var models  = require(contextPath + '/models');


function getMatches(req,res,sendResponse){
	var runningMatchIds=[];
	var runningMatches=[];
	models.scheduled_matches.findAll({limit:4})

	.then(function(secheduledMatches){
		for(var i in secheduledMatches){
			runningMatchIds.push(secheduledMatches[i].match_id);
		}

		models.matches.findAll({ where: { match_id:  runningMatchIds} })
		.then(function(matches){
			for(var i in secheduledMatches){
				var temp={matchInfo:matches[i],runningMatchInfo:secheduledMatches[i]};
				runningMatches.push(temp);
			}

			sendResponse(null,runningMatches,res);
		})
		.catch(function(err){
			sendResponse(err,null,res);
		})
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}


function getRefereeMatch(req,res,sendResponse){
	var runningMatchIds=[];
	models.scheduled_matches.findAll()
	.then(function(secheduledMatches){
		for(var i in secheduledMatches){
			runningMatchIds.push(secheduledMatches[i].match_id);
		}

		models.matches.findAll({where:{match_id:  runningMatchIds, referee:req.query.referee}})
		.then(function(refereeMatch){
			var match=[];
			for(var i in secheduledMatches){
				if(secheduledMatches[i].match_id===refereeMatch[0].match_id){
					var temp={matchInfo:refereeMatch,runningMatchInfo:secheduledMatches[i]};
					match.push(temp);
					break;
				}
			}

			sendResponse(null,match,res);
		})
		.catch(function(errr){
			sendResponse(errr,null,res);
		})
	})
	.catch(function(err){
		sendResponse(errr,null,res);
	})
}

function getCourtMatch(req,res,sendResponse){
	var runningMatchIds=[];
	models.scheduled_matches.findAll()
	.then(function(secheduledMatches){
		for(var i in secheduledMatches){
			runningMatchIds.push(secheduledMatches[i].match_id);
		}

		models.matches.findAll({where:{match_id:  runningMatchIds, court:req.query.court}})
		.then(function(refereeMatch){
			var match=[];
			for(var i in secheduledMatches){
				if(secheduledMatches[i].match_id===refereeMatch[0].match_id){
					var temp={matchInfo:refereeMatch,runningMatchInfo:secheduledMatches[i]};
					match.push(temp);
					break;
				}
			}

			sendResponse(null,match,res);
		})
		.catch(function(errr){
			sendResponse(errr,null,res);
		})
	})
	.catch(function(err){
		sendResponse(errr,null,res);
	})
}
module.exports={
	execute:function(req,res,sendResponse){

		if(req.query.operation==="getmatches"){
			getMatches(req,res,sendResponse);
		}
		else if(req.query.operation==="getrefereematch")
		{
			getRefereeMatch(req,res,sendResponse)
		}
		else if(req.query.operation==="getcourtmatch"){
			getCourtMatch(req,res,sendResponse);
		}
	}
}