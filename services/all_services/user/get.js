var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function getRecords(res,sendResponse){
	models.users.findAll(
		{ where: { role: 'Referee' } }
	)
	.then(function(users){
		sendResponse(null,users,res);
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

function getUser(req,res,sendResponse){
	models.users.findById(req.query.userName)
	.then(function(user){
		if(user.password===req.query.password){
			sendResponse(null,user,res)
		}
		else{
			sendResponse("Wrong password",user,res);
		}
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}
module.exports={
	execute:function(req,res,sendResponse){

		if(req.query.operation==="login"){
			getUser(req,res,sendResponse)
		}
		else if(req.query.operation==="getReferees"){
			getRecords(res,sendResponse);
		}
		
	}
}