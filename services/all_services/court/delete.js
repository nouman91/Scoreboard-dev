var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function deleteRecords(req,res,sendResponse){
	models.courts.destroy({
		where:{
			court_name:req.body.courts
		}
	})
	.then(function(court){
		models.courts.findAll().
		then(function(courts){
			sendResponse(null,courts,res);
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