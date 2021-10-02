
var ObjectId = require('mongodb').ObjectID;
const bcrypt = require("bcrypt")

const saltRounds = 10;
var mechanicModel = require('../models/mechanicmodel')
exports.signup = function(req,res){ 
    var countValue = req.body;
    console.log(req.files[0].filename)
    console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
    mechanicModel.findOne({email:countValue.email},function(err,user){
      console.log(user)
      if(user) return res.send({ auth : false, message :"Email Already Exits"});
    
    bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
    var data = { 
      "firstname": countValue.fname, 
      "lastname": countValue.lname,
      "email":countValue.email, 
      "password":hash,
      "town":countValue.town,
      "city":countValue.city,
      "startinghours": countValue.startinghours,
      "endinghours": countValue.endinghours,
      "propic":req.files[0].filename
      
  
  
   
  } 
  console.log("HashedPwd: ", hash)
    mechanicModel.create(data,function(err, collection){ 
      if (err) throw err; 
      console.log("Record inserted Successfully"); 
      return res.send({ auth : true, message :"You are now a regustered mechanic please login"});
            
  }); 
  });
  });
  
        
  }
  exports.signin = function(req,res){ 
    var countValue = req.body;
    console.log("U are ", countValue.email);
    
    mechanicModel.findOne({ email: countValue.email }, function(err, collection){
    if(err){
        console.log("Invalid User");
        return res.send({
          success: false,
          message: 'User not exists'
        });
    }else{
      
      if (collection!=null){
        console.log("User found");
        
        bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
          console.log(resi)
          
        if (resi === true){
          console.log("Correct details found");
          console.log(collection.firstname+ countValue.email+collection._id)
          
          return res.send({
            success: true,
            message: 'Correct Details',
            fname: collection.firstname,
            lname: collection.lastname,
            email: collection.email,
            id: collection._id,
            isadmin:'false',
            islogged:"true",
            type: "Mechanic"
          });
        }else{
          return res.send({
            success: false,
            message: 'Error: Email and Pass Dont Match'
          });
         
        }
      });
        
      }else{
        console.log("User not found");
        return res.send({
          success: false,
          message: 'Error: Incorrect User, Recheck Your Email'
        });
      }
    }
     
  });
        
  }
  exports.getAllmechanics = async function(req,res){ 
    console.log("lets get mechanics")
    const filter = {};
    const all = await mechanicModel.find(filter);
    console.log("All Mechanics: ", all)
    res.json(all)
        
  }
  exports.getuserByID = function(req,res){ 
  
    let id = req.params.id;
    mechanicModel.findOne({"_id": ObjectId(req.params.id)}, function(err, profile) {
      console.log("profile Found",profile)
      res.json(profile)
  });
  
        
  }