"use strict";

module.exports=function(sequelize,DataTypes){
	var scheduled_matches = sequelize.define("scheduled_matches",{
		team_a_sccore:{type:DataTypes.INTEGER,allowNull:false},
		team_b_score:{type:DataTypes.INTEGER, allowNull:false},
		played_minutes:{type:DataTypes.INTEGER, allowNull:false},
		played_seconds:{type:DataTypes.INTEGER, allowNull:false},
		saved_system_time:{type:DataTypes.INTEGER, allowNull:false},
		match_id:{type:DataTypes.INTEGER},
		running_match_id:{type:DataTypes.INTEGER,allowNull:false,autoIncrement: true,primaryKey: true}
	});

	return scheduled_matches;
};