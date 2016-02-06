var models  = require('../models');


//Saving record
function addRecord(req,res,sendResponse){
	//saving it
	models.users.create({
		user_name: req.body.userName,
		password: req.body.password,
		role: req.body.role,
	}).then(function(user){
		sendResponse(null,user,res);
	}).catch(function(err){
		sendResponse(err,null,res)
	});
}

module.exports={
	execute:function(req,sendResponse){
		this.addRecord(req,res,sendResponse);
	}
}