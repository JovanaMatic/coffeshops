const express = require('express');
const router = express.Router();
const MongoModel = require('../models/dbmodel.js');

//get a list of coffee shops from the data base
router.get('/coffee', (req, res, next) => {
    //this is how you retreive all obj from DB:
    //MongoModel.find({}).then(function(cofeeshops) {
        //res.send(cofeeshops);
    //});
    // retreive obj from DB according to the lat and long by adding params in URL
    MongoModel.aggregate().near({
        near:
        {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },  // latitude and longitude from url parameters 
        maxDistance: 500, // meters
        spherical: true,     // counts distance based on sphere shape
        distanceField: "dis"
    }
    ).then(function (results) {
        res.send(results);
    }).catch(next)
});
     

//add a new coffee shop to DB
router.post('/coffee', (req, res, next) => {
    //var coffee = new MongoModel(req.body);
    //coffee.save();  //da sacuvamo info u db

    //shorter method without creating an instance:
    MongoModel.create(req.body).then((coffeeShop) => {
        // return data to the client to see if everything passed succesfully (this can be seen in Postman)
        res.send(coffeeShop);
    // returning a promisse, this error is handeled via midlwear (next func...) 
    }).catch(next);
});

//update the coffee shop in DB
router.put('/coffee/:id', (req, res, next) => {
    MongoModel.findOneAndUpdate( {_id: req.params.id}, req.body )
    .then(function() {
        MongoModel.findById({_id: req.params.id })
        .then(function(newCoffesShop) {
            res.send(newCoffesShop);
        });
    });
});

//delete the coffeeshop from DB
router.delete('/coffee/:id', (req, res, next) => {
    MongoModel.findByIdAndRemove({ _id: req.params.id })
    .then(function(coffeeShop) {
        //send a client obj that is deleted
        res.send(coffeeShop);
    });
});

module.exports = router;
