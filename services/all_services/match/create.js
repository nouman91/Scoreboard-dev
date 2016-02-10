var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function addMatch(req,res,sendResponse){
	models.matches.create({
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
		match_date:req.body.matchDateTime,
		match_status:"saved"
	})
	.then(function(match){
		if(!(req.body.newTemplate.length===0 || !req.body.newTemplate.trim())){
			models.match_templates.create({
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
				match_date:req.body.matchDateTime,
				template_name:req.body.newTemplate,
				match_status:"saved"
			})
			.then(function(saved){
				models.match_templates.findAll().
				then(function(templates){
					sendResponse(null,templates,res);	
				})
				.catch(function(err){
					sendResponse("Data Save successfully but there was some error in fetching the tempalte please referesh the page",null,res)
				})
				
			})
			.catch(function(err){
				sendResponse("Match saved successfully but there was an error during saving the template.Please try again later",null,res)
			})
		}
		else{
			sendResponse(null,match,res);
		}
	})
	.catch(function(err){
		sendResponse("We cannot process your request at this moment. Please try again later",null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		addMatch(req,res,sendResponse);
	}
}