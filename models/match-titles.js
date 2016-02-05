"use strict";

module.exports=function(sequelize,DataTypes){
	var match_titles = sequelize.define("match_titles",{
		title:{type:DataTypes.STRING, unique:true, allowNull:false,primaryKey: true}
	});

	return match_titles;
};