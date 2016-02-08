var contextPath=process.cwd();
var models  = require(contextPath + '/models');


function deleteRecords(req,res,sendResponse){
	models.users.destroy({
		where:{
			user_name:req.body.referees
		}
	})
	.then(function(user){
		models.users.findAll({ where: { role: 'referee' } }).
		then(function(users){
			sendResponse(null,users,res);
		})
		.catch(function(err){
			sendResponse(err,null,res);
		})
		
	})
	.catch(function(err){
		sendResponse(err,null,res);
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		deleteRecords(req,res,sendResponse);
	}
}