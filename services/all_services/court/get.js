var models  = require('../models');

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
	execute:function(res,sendResponse){
		this.getRecords(res,sendResponse);
	}
}