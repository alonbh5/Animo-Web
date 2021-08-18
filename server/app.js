const express = require('express');
const app = express();
const morgan = require('morgan'); //for logger
const mongoose = require('mongoose'); //for mongoDB



//===============================/// MongoDB /////===============================


const MongoDBUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@animo-mta.ss2ls.mongodb.net/Data?retryWrites=true&w=majority`;

/*  NOTICE:
        - Make sure username+password is at nodemon.json (and that its on gitignore).
        - After "@nodejs-test.g9aau.mongodb.net" - write the name of the default collection.
*/
mongoose.connect(MongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log("MongoDB is Connected!");
});
//==============================================================================

//===============================/// Routes /////===============================
const phyDataRoute = require('./api/routes/phyDataRoute');
const usersRoute = require('./api/routes/usersRoute');
const BotResRoute = require('./api/routes/botResRoute');
const EmotionsRoute = require('./api/routes/emotionsRoute');
const PersQuizRoute = require('./api/routes/persQuizRoute');
const RolesRoute = require('./api/routes/rolesRoute');
const HttpError = require('./api/models/http-error');
const PersDataRoute = require('./api/routes/persDataRoute');
//==============================================================================

app.use(morgan("dev"));

//********************************************/// DATA HANDLER /////********************************************

//to get json data to be on req.body.message use:
app.use(express.json());
//to get x-wwww..... data to be on req.body.message use:
/*
    extended: true = {alon[a]: val1 ---> "a": "val1"}
    extended: false = {alon[a]: val1 ---> "alon[a]": "val1"}
*/
app.use(express.urlencoded({
    extended: true
}));
//********************************************/// END /////*************************************************

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});



//*********************************************/// Router /////*********************************************
app.use('/phydata', phyDataRoute);
app.use('/users', usersRoute);
app.use('/botres', BotResRoute);
app.use('/emotions', EmotionsRoute);
app.use('/persquiz', PersQuizRoute);
app.use('/roles', RolesRoute);
app.use('/persdata',PersDataRoute);
//********************************************/// END /////*************************************************


app.use((req, res, next) => {
   throw new HttpError("Could not find this route!", 404)
    // throw error;
    // error.status = 404;
    // next(error);
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || "An Unkownd error occurred!"
    })
})

module.exports = app;