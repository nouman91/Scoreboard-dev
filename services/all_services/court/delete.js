var models  = require('../models');

function deleteRecords(req,res,sendResponse){
	models.courts.destroy({
		where:{
			court_name:req.body.courtName
		}
	})
	.then(function(court){
		sendResponse(null,court,res);
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