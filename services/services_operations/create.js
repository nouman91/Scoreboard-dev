var common = require("./common");

module.exports={
	execute:function(req,res,sendResponse){
		var service = common.execute(req.body.service,'create');
		if(common.validateServiceExistence(service)){
			service.execute(req,res,sendResponse);	
		}
		
	}
}