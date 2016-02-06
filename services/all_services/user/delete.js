var models  = require('../models');

function deleteRecords(req,res,sendResponse){
	models.users.destroy({
		where:{
			user_name:req.body.userName
		}
	})
	.then(function(user){
		sendResponse(null,user,res);
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