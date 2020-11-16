const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/api.js');

const app = express();

//connect to mongoDB
const dataBase = 'mongodb+srv://@cluster0.8vdaq.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(data => app.listen(4000))
.catch(err => console.log(err));

//mongoose.connect('mongodb://localhost/coffeedzo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
mongoose.Promise = global.Promise; //overwriting mongo promise which is depricated with node promise

// serve html, css, images files
app.use(express.static('public'));

//always at the top!!!
app.use(bodyParser.json());

//use the routes that we specified in app.js and specifies general route /api 
app.use('/api', routes);

// error handling midlwear
app.use(function(err, req, res, next) {
    //console.log(err);
    res.status(422).send({ error: err.message }); // rerurn statsu 422 if there is a error(missing required paramater ex name)
})

app.get('/', function(req, res) {
    res.send({ name: 'Coffee bars and their best features'})
});

//listen for requests
// app.listen(process.env.port || 4000, function() {
//     console.log('listening for requests');
// });