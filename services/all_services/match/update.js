var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function updateMatch(req,res,sendResponse){
	models.matches.update({ 
		team_a:req.body.teamA,
		team_b:req.body.teamB,
		referee:req.body.referee,
		court:req.body.court,
		match_title:req.body.matchTitle,
		match_minutes:req.body.matchMinutes,
		match_seconds:req.body.matchSeconds,
		half_time_minutes:req.body.halfTimeMinutes,
		half_time_seconds:req.body.halfTimeSeconds,
		break_time_minutes:req.body.breakTimeMinutes,
		break_time_seconds:req.body.breakTimeSeconds,
		timout_time_minutes:req.body.timeoutTimeMinutes,
		timout_time_seconds:req.body.timeoutTimeSeconds,
		match_date:req.body.matchDateTime,
		match_status:"saved"
	}, 
	{ 
		where: {match_id: req.body.matchId}
	})
	.then(function(saved){
		sendResponse(null,saved,res)
	})
	.catch(function(err){
		sendResponse('Some error auccred please try again later',null,res)
	})
}
module.exports={
	execute:function(req,res,sendResponse){
		updateMatch(req,res,sendResponse);
	}
}