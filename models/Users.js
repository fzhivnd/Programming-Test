'use strict';

// SQL Database User tabels
module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('user',{
        name:{
            type:DataTypes.STRING,
            allowNull : false
        },
        password:{
            type : DataTypes.STRING,
            allowNull : false,
        }
    });
    User.associate = function(models){
        User.hasMany(models.movie_favorites,{
            onDelete:'cascade'
        })
    }
    
    return User;
};