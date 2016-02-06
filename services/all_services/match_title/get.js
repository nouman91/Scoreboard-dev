var models  = require('../models');

function getRecords(res,sendResponse){
	models.match_titles.findAll()
	.then(function(match_titles){
		sendResponse(null,match_titles,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}


module.exports={
	execute:function(res,sendResponse){
		this.getRecords(res,sendResponse);
	}
}