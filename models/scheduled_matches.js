"use strict";

module.exports=function(sequelize,DataTypes){
	var scheduled_matches = sequelize.define("scheduled_matches",{
		team_a_score:{type:DataTypes.INTEGER,allowNull:true},
		team_b_score:{type:DataTypes.INTEGER, allowNull:true},
		saved_match_time:{type:DataTypes.DATE, allowNull:true},
		saved_break_time:{type:DataTypes.DATE, allowNull:true},
		saved_timeout_time:{type:DataTypes.DATE, allowNull:true},
		match_state:{type:DataTypes.STRING,allowNull:true},
		match_halftime_state:{type:DataTypes.INTEGER,allowNull:true},
		match_id:{type:DataTypes.INTEGER,allowNull:false},
		running_match_id:{type:DataTypes.INTEGER,allowNull:false,autoIncrement: true,primaryKey: true}
	});

	return scheduled_matches;
};