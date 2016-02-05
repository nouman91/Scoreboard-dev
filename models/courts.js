"use strict";

module.exports=function(sequelize,DataTypes){
	var courts = sequelize.define("courts",{
		court_name:{type:DataTypes.STRING, unique:true, allowNull:false,primaryKey: true}
	});

	return courts;
};