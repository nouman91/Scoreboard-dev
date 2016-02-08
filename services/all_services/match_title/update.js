var contextPath=process.cwd();
var models  = require(contextPath + '/models');


function updateRecord(req,res,sendResponse){
	models.match_titles.update({ title: req.body.matchTitle }, { where: {title: req.body.oldMatchTitle} })
	.then(function(match_title){
		sendResponse(null,match_title,res);
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