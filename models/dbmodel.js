const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// "type": "Feature",
// "geometry": {
//   "type": "Point",
//   "coordinates": [125.6, 10.1]

// create new schema for geo location

const GeoSchema = new Schema({
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [ Number ],
            index: "2dsphere"
        }
});

    
// create db schema and model

const mongoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    feature: {
        type: String
    },
    wifi: {
        type: Boolean,
        default: true
    },
    // add in geo location
    geometry: GeoSchema
});

const MongoModel = mongoose.model('coffeeShop', mongoSchema); // name of our mongoDB colection "coffeeShop" and schema that we created

module.exports = MongoModel;
