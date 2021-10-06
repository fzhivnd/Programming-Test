'use strict';

// SQL Database Movie tabels
module.exports = (sequelize, DataTypes) =>{
    const Movie = sequelize.define('movie_favorites',{
        title:{
            type:DataTypes.STRING,
            allowNull : false
        }
    });
    Movie.associate = function(models){
        Movie.belongsTo(models.user, {foreignKey:'user_id'})
    }

    return Movie;
};