var models  = require('../models');

function deleteRecords(req,res,sendResponse){
	models.match_titles.destroy({
		where:{
			title:req.body.title
		}
	})
	.then(function(match_title){
		sendResponse(null,match_title,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		this.deleteRecords(req,res,sendResponse);
	}
}