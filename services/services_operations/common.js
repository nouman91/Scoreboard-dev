
var services=["court","match_template","match_title","match","match_report","schedule_match","team","user"];
var contextPath = process.cwd();

module.exports={

	execute:function(service,type){
		var index=services.indexOf(service);
		var service = require(contextPath+"/services/all_services/"+services[index]+"/"+type+".js");
		return service; 
	},

	validateServiceExistence:function(service){
		if(service){
			return true;
		}
		else{
			false;
		}
	}
}