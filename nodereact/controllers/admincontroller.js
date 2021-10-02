var ObjectId = require('mongodb').ObjectID;
const bcrypt = require("bcrypt")
const saltRounds = 10;
var userModel = require('../models/usermodel')
var adminModel = require('../models/adminmodel')
var adsModel = require('../models/adsmodel')
exports.banUser = function(req,res){ 
  console.log(req.body.useremail)
  userModel.findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("isbanned? ",creden.isbanned)
    var newban=true
    
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "isbanned": newban,
        
      }
    };
    userModel.findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Congrats',
      
    });
});
      
}
exports.unbanUser = function(req,res){ 
  console.log("User email:",req.body.useremail)
  userModel.findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("isbanned? ",creden.isbanned)
    var newban=false
    
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "isbanned": newban,
        
      }
    };
    userModel.findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Congrats',
      
    });
});

      
}
exports.adminSignin = async function(req,res){ 
  var countValue = req.body;
    console.log("U are ", countValue);
    adminModel.findOne({"id": countValue.id }, function(err, collection){
      if(err){
          console.log("Invalid Admin");
          return res.send({
            success: false,
            message: 'Admin not exists'
          });
      }else{
        
        if (collection!=null){
          console.log("Admin found");
          bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
            console.log(resi)
          if (resi === true){
            console.log("Admin Matched");
            return res.send({
              success: true,
              message: 'Correct Details',
              isadmin:"true",
              islogged:"false"
            });
          }else{
            return res.send({
              success: false,
              message: 'Error: Admin ID and Pass Dont Match'
            });
           
          }
        });
          
        }else{
          console.log(collection)
          console.log("Admin not found");
          return res.send({
            success: false,
            message: 'Error: Incorrect Admin, Recheck Your Admin ID'
          });
        }
      }
       
    });
      
}
exports.adminSignup = async function(req,res){ 
  var countValue = req.body;
  
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "id": countValue.id, 
    "password":hash
} 
console.log("HashedPwd: ", hash)
  adminModel.create(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    return res.send({
       auth : true,
       message :"You are now a admin please login"
      });
          
}); 
});
      
}
