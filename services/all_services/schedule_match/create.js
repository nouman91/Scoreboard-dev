
var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function addRecord(req,res,sendResponse){
	models.scheduled_matches.create({
		team_a_score:0,
		team_b_score:0,
		saved_match_time:null,
		saved_break_time:null,
		saved_timeout_time:null,
		match_state:"RUN",
		match_halftime_state:1,
		match_id:req.body.matchId
	})
	.then(function(match){
		models.matches.update(
			{match_status:"SCH"},{where:{match_id:req.body.matchId}}
		)
		.then(function(m){
			sendResponse(null,m,res);
		})
		.catch(function(err){
			models.scheduled_matches.destroy({
				where:{
					match_id:req.body.matchId
				}
			})
			.then(function(st){
				sendResponse("Match cannot be scheduled please try again",null,res);
			})
			.catch(function(err){
				sendResponse("Match cannot be scheduled please try again",null,res);	
			})
		})	
	})
	.catch(function(err){
		sendResponse("Match cannot be scheduled please try again",null,res);
	})
}

module.exports={
	execute:function(req,res,next){
		addRecord(req,res,next);
	}
}