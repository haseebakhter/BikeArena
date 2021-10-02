var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var mechanic = new Schema({
    "firstname": String, 
    "lastname": String,
    "email":String, 
    "password":String,
    "town":String,
    "city":String,
    "startinghours": String,
    "endinghours": String,
    "propic":String,
    "phoneno":String
});
module.exports = mongoose.model('mechanics', mechanic);