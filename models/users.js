"use strict";

module.exports=function(sequelize,DataTypes){
	var users = sequelize.define("users",{
		user_name:{type:DataTypes.STRING, unique:true, allowNull:false,primaryKey: true},
		password:{type:DataTypes.STRING, allowNull:true},
		role:{type:DataTypes.STRING, allowNull:false},
	});

	return users;
};