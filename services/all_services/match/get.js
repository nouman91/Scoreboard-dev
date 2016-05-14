var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function getDataForAddMatch(res,sendResponse){
	var matchData={
		templates:"",
		teams:"",
		matchTitles:"",
		referees:"",
		courts:""
	}

	models.match_templates.findAll().
	then(function(templates){
		models.teams.findAll().
		then(function(teams){
			models.match_titles.findAll().
			then(function(matchTitles){
				models.users.findAll({ where: { role: 'Referee' } }).
				then(function(referees){
					models.courts.findAll().
					then(function(courts){
						matchData.templates=templates;
						matchData.teams=teams;
						matchData.matchTitles=matchTitles
						matchData.referees=referees;
						matchData.courts=courts;
						

						sendResponse(null,matchData,res)
					})
					.catch(function(err){
						//4th error
						sendResponse(err,null,res);
					})
				})
				.catch(function(err){
					// 3rd error
					sendResponse(err,null,res);
				})
			})
			.catch(function(err){
				//2nd error
				sendResponse(err,null,res);
			})
		})
		.catch(function(err){
			//first error
			sendResponse(err,null,res);
		})
	})
	.catch(function(err){
		//main error
		sendResponse(err,null,res);
	})

}

function getMatches(res,sendResponse)
{
	models.matches.findAll({order:[['match_date','ASC']]}).
	then(function(matches){
		sendResponse(null,matches,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}
module.exports={
	execute:function(req,res,sendResponse){
		if(req.query.operation==="getaddmatch"){
			getDataForAddMatch(res,sendResponse);
		}
		else if(req.query.operation==="getdmatches"){
			getMatches(res,sendResponse);
		}
	}
}