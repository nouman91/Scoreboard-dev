var contextPath=process.cwd();
var models  = require(contextPath + '/models');


//Saving record
function addRecord(req,res,sendResponse){
	//saving it
	models.match_titles.create({
		title: req.body.matchTitle
	}).then(function(match_title){
		sendResponse(null,match_title,res);
	}).catch(function(err){
		sendResponse(err,null,res)
	});
}

module.exports={
	execute:function(req,res,sendResponse){
		addRecord(req,res,sendResponse);
	}
}