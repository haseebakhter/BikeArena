var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var ad = new Schema({
    "Category": String, 
    "adtitle": String,
    "Model":String, 
    "addescription":String,
    "useremail":String,
    "userid": String,
    "username": String,
    "BikePart": String,
    "brand": String,
    "Mileage": String,
    "condition":String,
    "city": String,
    "adimg": String,
    "adimg2": String,
    "adimg3": String,
    "adimg4": String,
    "advideo": String,
    "price": Number,
    "issold": Boolean,
    "date": String
});
module.exports = mongoose.model('ads', ad);