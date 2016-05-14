
var contextPath=process.cwd();
var models  = require(contextPath + '/models');

function getReports(req,res,sendResponse){
	var d = new Date(req.query.date);
    var day = d.getDate();
    var month = d.getMonth();
    month = month+1;
    var year = d.getFullYear();
    var cDate = year+"-"+month+"-"+day;
    
	models.matches_report.findAll({ where: { match_date: cDate } })
	.then(function(reports){
		if(reports.length>0){
			sendResponse(null,reports,res);	
		}
		else{
			sendResponse("No report found.",reports,res);
		}
	})
	.catch(function(err){
		sendResponse("Cannot process your request please try again later",null,res);	
	})
}

module.exports={
	execute:function(req,res,sendResponse){
		getReports(req,res,sendResponse);
	}
}