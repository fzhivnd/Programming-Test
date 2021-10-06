require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;
const userroutes = require('./routes/userroutes');
const authroutes = require('./routes/authroutes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressPinoLogger = require('express-pino-logger');
const logger = require('./Utils/logger');

const eplMiddleware = expressPinoLogger({
    logger : logger,
    useLevel : 'http'
});

app.use(eplMiddleware);
const sessionOptions = { secret: process.env.SESSION_SECRET};
app.use(session(sessionOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(userroutes);
app.use(authroutes);


db.sequelize.sync().then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Listening on PORT ${PORT}`)
    })
})
