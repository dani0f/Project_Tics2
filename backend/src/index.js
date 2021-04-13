const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bp = require('body-parser')
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb://localhost/sigdo-database')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
//middlewares

//CORS config
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//routes
app.use('/api/orders',require('./routes/orders'));

//Static files

app.use(express.static(__dirname + '/public'));

//server is listening
app.listen(3000, ( ) => {
    console.log("Server on port", app.get('port'));
});

