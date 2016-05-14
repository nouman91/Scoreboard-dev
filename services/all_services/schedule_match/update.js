
var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function updateScore(req,res,sendResponse){
	models.scheduled_matches.update({team_a_score:req.body.teamAScore,team_b_score:req.body.teamBScore}, {where:{running_match_id:req.body.runningMatchId}})
	.then(function(match){
		sendResponse(null,match,res);
	})
	.catch(function(err){
		sendResponse("Some error occured please try again later",null,res);
	})
}

function updateMatchStatusAndDate(req,res,sendResponse){
	models.scheduled_matches.update({saved_match_time:req.body.date},{where:{running_match_id:req.body.runningMatchId}})
	.then(function(mat){
		models.matches.update({match_status:"RUN"},{where:{match_id:req.body.matchId}})
		.then(function(rp){
			sendResponse(null,rp,res);
		})
		.catch(function(err){
			sendResponse("Error occured",null,res);
		})
	})
	.catch(function(err){
		sendResponse("Error occured",null,res);
	})
}

/*function setMatchAsFinished(req,res,sendResponse){
	models.scheduled_matches.findAll({where:{running_match_id:req.body.runningMatchId}})
	.then(function(rMatch){
		sendResponse(null,null,res);
		
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}*/

function setMatchAsFinished(req,res,sendResponse){

	models.scheduled_matches.findAll({where:{running_match_id:req.body.runningMatchId}})
	.then(function(rMatch){
		models.matches.findAll({where:{match_id:req.body.matchId}})
		.then(function(match){
			models.scheduled_matches.destroy({where:{running_match_id:req.body.runningMatchId}})
			.then(function(resp){
				models.matches.destroy({where:{match_id:req.body.matchId}})
				.then(function(temp){
					//
					var status = "";
					if(rMatch[0].team_a_score>rMatch[0].team_b_score){
						status= match[0].team_a;
					}
					else if(rMatch[0].team_b_score>rMatch[0].team_a_score){
						status= match[0].team_b;
					}
					else if(rMatch[0].team_a_score===rMatch[0].team_b_score){
						status="Match Tied";
					}
					var d = new Date();
				    var day = d.getDate();
				    var month = d.getMonth();
				    month = month+1;
				    var year = d.getFullYear();
				    var cDate = year+"-"+month+"-"+day;

					models.matches_report.create({
						team_a:match[0].team_a,
						team_b:match[0].team_b,
						team_a_score:rMatch[0].team_a_score,
						team_b_score:rMatch[0].team_b_score,
						referee:match[0].referee,
						court:match[0].court,
						match_title:match[0].match_title,
						match_minutes:match[0].match_minutes,
						match_seconds:match[0].match_seconds,
						half_time_minutes:match[0].half_time_minutes,
						half_time_seconds:match[0].half_time_seconds,
						break_time_minutes:match[0].break_time_minutes,
						break_time_seconds:match[0].break_time_seconds,
						match_date:cDate,					
						match_status:status
					})
					.then(function(rp){
						sendResponse(null,rp,res);
					})
					.catch(function(err){
						sendResponse(err,null,res);
					})
				})
				.catch(function(err){
					sendResponse(err,null,res);
				})
			})
			.catch(function(err){
				sendResponse(err,null,res);
			})	
		})
		.catch(function(err){
			sendResponse(err,null,res);
		})
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

function updateMatchTime(req,res,sendResponse){
	models.scheduled_matches.update({saved_match_time:req.body.matchSavedTime},{where:{running_match_id:req.body.runningMatchId}})
	.then(function(match){
		sendResponse(null,match,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

function updateBreakMatchState(req,res,sendResponse){

	models.scheduled_matches.update({match_state:req.body.state,saved_break_time:req.body.date,match_halftime_state:0},{where:{running_match_id:req.body.runningMatchId}})
	.then(function(match){
		sendResponse(null,match,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}


function updateTimeoutMatchState(req,res,sendResponse){
	models.scheduled_matches.update({match_state:req.body.state,saved_timeout_time:req.body.date},{where:{running_match_id:req.body.runningMatchId}})
	.then(function(match){
		sendResponse(null,match,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		if(req.body.operation==="updateScore"){
			updateScore(req,res,sendResponse);
		}
		else if(req.body.operation==="updatematchtimeandstatus"){
			updateMatchStatusAndDate(req,res,sendResponse);
		}
		else if(req.body.operation==="setmatchasfinished"){
			setMatchAsFinished(req,res,sendResponse);
		}
		else if(req.body.operation==="updatematchtime"){
			updateMatchTime(req,res,sendResponse);
		}
		else if(req.body.operation==="updatebreakmatchstate"){
			updateBreakMatchState(req,res,sendResponse);
		}
		else if(req.body.operation==="updatetimeoutmatchstate"){
			updateTimeoutMatchState(req,res,sendResponse);
		}
	}
}