var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function getRecords(res,sendResponse){
	models.courts.findAll()
	.then(function(courts){
		sendResponse(null,courts,res);
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