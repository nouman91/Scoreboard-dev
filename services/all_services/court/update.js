var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function updateRecord(req,res,sendResponse){
	models.courts.update({ court_name: req.body.courtName }, { where: {court_name: req.body.oldCourtName} })
	.then(function(court){
		sendResponse(null,court,res);
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