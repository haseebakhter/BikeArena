
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var user = new Schema({
    "firstname": String, 
    "lastname": String,
    "email":String, 
    "password":String,
    "followers":[String],
    "following":[String],
    "isbanned": Boolean,
    "propic": String,
    "address": String,
    "favs":[String],
    "resetToken": String,
    "resetTokenExpiration": Date,
    "credits": Number,
    "cart":{type: mongoose.Schema.Types.ObjectId,
        ref: 'ads'}
});
module.exports = mongoose.model('details', user);