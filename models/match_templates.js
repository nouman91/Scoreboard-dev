"use strict";

module.exports=function(sequelize,DataTypes){
	var match_templates = sequelize.define("match_templates",{
		team_a:{type:DataTypes.STRING,allowNull:false},
		team_b:{type:DataTypes.STRING, allowNull:false},
		referee:{type:DataTypes.STRING, allowNull:false},
		court:{type:DataTypes.STRING, allowNull:false},
		match_title:{type:DataTypes.STRING, allowNull:false},
		match_minutes:{type:DataTypes.INTEGER, allowNull:false},
		match_seconds:{type:DataTypes.INTEGER, allowNull:false},
		half_time_minutes:{type:DataTypes.INTEGER, allowNull:false},
		half_time_seconds:{type:DataTypes.INTEGER, allowNull:false},
		break_time_minutes:{type:DataTypes.INTEGER, allowNull:false},
		break_time_seconds:{type:DataTypes.INTEGER, allowNull:false},
		timout_time_minutes:{type:DataTypes.INTEGER, allowNull:false},
		timout_time_seconds:{type:DataTypes.INTEGER, allowNull:false},
		match_date:{type:DataTypes.DATE, allowNull:false},
		match_status:{type:DataTypes.STRING,allowNull:false},
		template_name:{type:DataTypes.STRING,allowNull:false,primaryKey: true}
	});

	return match_templates;
};
