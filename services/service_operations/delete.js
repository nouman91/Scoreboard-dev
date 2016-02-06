var common = require("./common");

module.exports={
	execute:function(req,res,sendResponse){
		var service = common.execute(req);
		if(common.validateServiceExistence(service)){
			service.execute(req,res,sendResponse);	
		}
		
	}
}