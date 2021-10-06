const { authjwt } = require('../middleware');
const controller = require('../controllers/usercontrollers');
const express = require('express');
const router = express.Router();


// Router for user access

router.use((req, res, next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();

});

router.get('/', controller.root)
router.get('/movies', controller.forbidden)
router.get('/movie/:title', controller.searchMovie)
router.get('/movies/favorite',[authjwt.verifyToken], controller.allFavorite)
router.post('/movies/favorite',[authjwt.verifyToken], controller.addFavorite)


module.exports = router;