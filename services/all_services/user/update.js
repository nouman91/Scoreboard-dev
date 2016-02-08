var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function updateRecord(req,res,sendResponse){

	models.users.update({ user_name: req.body.userName }, { where: {user_name: req.body.oldUserName} })
	.then(function(user){
		sendResponse(null,user,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}
module.exports={
	execute:function(req,res,sendResponse){
		updateRecord(req,res,sendResponse);
	}
}