const express = require('express');
const router = express.Router();
const auth = require("../controllers/authcontrollers");


// Router for authentication
router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout',auth.logout);

module.exports = router;