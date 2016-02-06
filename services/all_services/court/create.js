var models  = require('../models');


//Saving court
function addRecord(req,res,sendResponse){
	//saving it
	models.courts.create({
		court_name: req.body.courtName;
	}).then(function(court){
		sendResponse(null,court,res);
	}).catch(function(err){
		sendResponse(err,null,res)
	});
}

module.exports={
	execute:function(req,res,sendResponse){
		this.addRecord(req,res,sendResponse);
	}
}