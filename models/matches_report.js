"use strict";

/*
This table will be used for saving executed matches.
*/
module.exports=function(sequelize,DataTypes){
	var matches_report = sequelize.define("matches_report",{
		team_a:{type:DataTypes.STRING,allowNull:false},
		team_b:{type:DataTypes.STRING, allowNull:false},
		team_a_score:{type:DataTypes.INTEGER,allowNull:false},
		team_b_score:{type:DataTypes.INTEGER, allowNull:false},
		referee:{type:DataTypes.STRING, allowNull:false},
		court:{type:DataTypes.STRING, allowNull:false},
		match_title:{type:DataTypes.STRING, allowNull:false},
		match_minutes:{type:DataTypes.INTEGER, allowNull:false},
		match_seconds:{type:DataTypes.INTEGER, allowNull:false},
		half_time_minutes:{type:DataTypes.INTEGER, allowNull:false},
		half_time_seconds:{type:DataTypes.INTEGER, allowNull:false},
		break_time_minutes:{type:DataTypes.INTEGER, allowNull:false},
		break_time_seconds:{type:DataTypes.INTEGER, allowNull:false},
		match_date:{type:DataTypes.STRING, allowNull:false},
		match_status:{type:DataTypes.STRING,allowNull:false},
		match_id:{type:DataTypes.INTEGER,allowNull:false,autoIncrement: true,primaryKey: true}
	});

	return matches_report;
};