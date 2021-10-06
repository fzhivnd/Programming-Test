const db = require('../models');
const User = db.user;
const Movie = db.movie_favorites;

// Utils for access database

// find username from user_id
exports.findUserName = async (user_id) =>{

  return await User.findOne({
    where :{
      id : user_id
    }
  }).catch((err) => {
    console.log(err);
  });

};

// Create user favorite movies
exports.createFavMovie = async(user_id, title) => {
    return await Movie.create({
      title: title,
      user_id: user_id,
    })
      .catch((err) => {
        console.log(">> Error while creating movie: ", err);
      });
  };

// Find all user favorite movies
exports.findAllMovie = async(user_id) =>{
    return await Movie.findAll({
      where:{
        user_id : user_id
      }
    }).catch((err) => {
      console.log(err);
    });
  };