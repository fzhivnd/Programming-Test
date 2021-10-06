
axios = require('axios');
Utils = require('../Utils/movieutils');
const logger = require('../Utils/logger');

const api_key = process.env.API_KEY; // b542a63c


// Controller GET /movie/{title}
exports.searchMovie = async(req, res) => {

        const {title} = req.params;
        logger.info(`GET /movie/${title} route is accessed`);
        const url = await axios.get(`http://www.omdbapi.com/?apikey=${api_key}&t=${title}`)
        if(url.data.Poster){
            const data = {
                header : req.headers,
                cookies : req.cookies,
                Data :{
                movietitle : title,
                url : url.data.Poster}
            }
            
            res.json(data);
        }
        else{
            res.json({status : "Not Found!"})
        }
       
};

// Controller GET /movies/favorite
exports.allFavorite = async(req, res) =>{
    logger.info("GET /movies/favorites route is accessed");
    const user_id = req.cookies.user_id;
    const name = await Utils.findUserName(user_id);
    var list ={header : req.headers, cookies : req.cookies,Data :
        {username : name.name,
    favorites_movies : []}};
    const listMovie = await Utils.findAllMovie(user_id);
    for( let movie of listMovie){
        var url = await axios.get(`http://www.omdbapi.com/?apikey=b542a63c&t=${movie.title}`)
        list.Data.favorites_movies.push({movietitle : movie.title, url : url.data.Poster})
    }
    if(list.Data.favorites_movies){
        res.json(list);
    }
    else{
        res.json({Status : 'Empty'})
    }
    
};

// Controller POST /movies/favorite
exports.addFavorite = async(req, res) => {
    logger.info("POST /movies/favorites route is accessed");
    const user_id = req.cookies.user_id;
    const { title } = req.body;
    const name = await Utils.findUserName(user_id);

    await Utils.createFavMovie(user_id, title);
    
    res.json({header : req.headers, cookies : req.cookies, Data : {status : 'succes',username : name.name,movietitle : title
    }} )
};

// Controller GET /
exports.root = (req, res) =>{
    logger.info("GET root route is accessed");
    res.status(200).send({status : "Root!"})
    
};

// Controller GET /movies
exports.forbidden = (req, res) =>{
    logger.warn("GET foridden route is accessed");
    res.status(400).send({status : "Forbidden!"})
    
};