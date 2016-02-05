"use strict";

module.exports=function(sequelize,DataTypes){
	var teams = sequelize.define("teams",{
		team_name:{type:DataTypes.STRING, unique:true, allowNull:false,primaryKey: true}
	});

	return teams;
};