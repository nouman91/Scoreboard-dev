var contextPath=process.cwd();
var models  = require(contextPath + '/models');


function getRecords(res,sendResponse){
	models.teams.findAll()
	.then(function(teams){
		sendResponse(null,teams,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}


module.exports={
	execute:function(req,res,sendResponse){
		getRecords(res,sendResponse);
	}
}