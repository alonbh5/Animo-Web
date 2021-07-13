const express = require('express');
const app = express(); 
const morgan  = require('morgan'); //for logger
const mongoose = require('mongoose'); //for mongoDB

//===============================/// MongoDB /////===============================


const MongoDBUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@animo-mta.ss2ls.mongodb.net/Users?retryWrites=true&w=majority`;

/*  NOTICE:
        - Make sure username+password is at nodemon.json (and that its on gitignore).
        - After "@nodejs-test.g9aau.mongodb.net" - write the name of the default collection.
*/
mongoose.connect(MongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected',() => {
    console.log("Alon, MongoDB is Connected!");
});
//==============================================================================

//===============================/// Routes /////===============================
const categoriesRoute = require('./api/routes/categories');
const textsRoute = require('./api/routes/texts');
const usersRoute = require('./api/routes/users');
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
    res.header("Accsess-Control-Allow-Origin","*");
    res.header("Accsess-Control-Allow-Headers","Origin, X-Requsted-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Accsess-Control-Allow-Methods","GET, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//*********************************************/// Router /////*********************************************
app.use('/texts',textsRoute);
app.use('/categories',categoriesRoute);
app.use('/users',usersRoute);
//********************************************/// END /////*************************************************


app.use((req, res, next)  => {
    const error = new Error("Not Found!")
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)  => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;