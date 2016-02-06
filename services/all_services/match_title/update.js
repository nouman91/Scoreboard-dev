var models  = require('../models');

function updateRecord(req,res,sendResponse){
	models.match_titles.update(
		{
			title:req.body.title
		},
		{
			title:req.body.title
		}
	)
	.then(function(match_title){
		sendResponse(null,match_title,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		this.updateRecord(req,res,sendResponse);
	}
}