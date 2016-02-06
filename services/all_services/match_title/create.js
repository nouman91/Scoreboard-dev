var models  = require('../models');


//Saving record
function addRecord(req,res,sendResponse){
	//saving it
	models.match_titles.create({
		title: req.body.title;
	}).then(function(match_title){
		sendResponse(null,match_title,res);
	}).catch(function(err){
		sendResponse(err,null,res)
	});
}

module.exports={
	execute:function(req,sendResponse){
		this.addRecord(req,res,sendResponse);
	}
}