var models  = require('../models');

function updateRecord(req,res,sendResponse){
	models.courts.update(
		{
			court_name:req.body.courtName
		},
		{
			court_name:req.body.courtName
		}
	)
	.then(function(court){
		sendResponse(null,court,res);
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