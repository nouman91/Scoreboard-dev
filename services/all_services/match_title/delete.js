var contextPath=process.cwd();
var models  = require(contextPath + '/models');


function deleteRecords(req,res,sendResponse){
	models.match_titles.destroy({
		where:{
			title:req.body.matchTitles
		}
	})
	.then(function(match_title){
		models.match_titles.findAll().
		then(function(match_titles){
			sendResponse(null,match_titles,res);
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