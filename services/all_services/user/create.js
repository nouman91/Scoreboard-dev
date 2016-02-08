var contextPath=process.cwd();
var models  = require(contextPath + '/models');


//Saving record
function addRecord(req,res,sendResponse){
	//saving it
	models.users.create({
		user_name: req.body.userName,
		password: "",
		role: "referee"
	}).then(function(user){
		sendResponse(null,user,res);
	}).catch(function(err){
		sendResponse(err,null,res)
	});
}

module.exports={
	execute:function(req,res,sendResponse){
		addRecord(req,res,sendResponse);
	}
}