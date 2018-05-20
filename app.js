/** GLOBAL PATH **/
global.MAIN_ROOT_PATH = __dirname;
global.APP_ROOT_PATH = __dirname + '/app/';
global.config = require('./config/');

/** EXPRESS **/
const express = require('express');
const mongoose = require('mongoose');
/** PATH **/
var path = require('path');

const app = express();

/** MONGODB CONNECT **/
mongoose.connect(config[NODE_ENV]['APP_DB_CONNECT'] , { useMongoClient: true } ,(error)=>{
    if(error)  console.log(error)
})



/** CORS **/
const cors = require("cors");
app.use(cors());

/** BODY PARSER **/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/** COKKIE PARSER **/
// app.use(cookieParser());


/** STATIC PATHS **/
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/storage', express.static(path.join(__dirname, 'storage')))


/** EXPRESS VALIDATOR **/
// app.use(expressValidator());

if(NODE_ENV == 'production') {

    const compression = require('compression');
    app.use(compression());

}else {
    //
}


app.use((req, res, next) => {

    if(!!req.query) {
        res.locals.lang = ['az','ru'].includes(req.query.lang) ? req.query.lang :'az';
    }else {
        res.locals.lang = 'az';
    }


    next();
});


/** ROUTES **/
app.use(APP_INIT.APP_API_PREFIX, require(API_ROUTE_PATH)); //api routes




app.use((req, res, next) => {

    const err = new Error('Not Found');
    err.status = 404;
    next(err);

});





/** ERROR HANDLER **/
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = NODE_ENV === 'development' ? err : {};

    // render the error status
    res.status(err.status || 500).json(err);

});


module.exports = app;