import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express')
var request =require('request')
const app = express()
var nodemailer = require("nodemailer");


const bcrypt = require("bcrypt")
import db from './config/dbconfig.js'
var bodyParser = require('body-parser')
const saltRounds = 10;
const port = 5000
const vari = "haris"
var cors = require('cors')
var url = "mongodb://localhost:27017/Jobweb";
app.use(cors())
 
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../myfrontend/public/content')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).array('file');
// parse application/json
app.use(bodyParser.json()) 
var ObjectId = require('mongodb').ObjectID;

app.post('/deletead', function(req,res){
  console.log("we deleting")
  console.log(req.body.id)
  db.collection('ads').findOneAndDelete({'_id': ObjectId(req.body.id)}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
})

app.get('/getufavs/:email',function(req,res){
  console.log("get saved ads of: ",req.params.email)
  db.collection('details').findOne({"email": req.params.email}, function(err, creden) {
    console.log("creden Found",creden.favs)
    var favs1=creden.favs
    res.send(favs1)
  })


})
app.post('/getuserIDName', function(req,res){
  console.log(" profile email: ", req.body.email)
  db.collection('details').findOne({"email": req.body.email}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

})
app.post('/savead', function(req,res){
  console.log(req.body.id)
  console.log(req.body.useremail)
  db.collection('details').findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("creden Found",creden.favs)
    var favs1=creden.favs
    favs1.push(req.body.id)
    console.log("updated favs of "+favs1)
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "favs": favs1,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Ad Saved',
      favs:favs1
    });
});
})
app.post('/updatejob',upload, function (req, res) {
  var bikelements = req.body;
  var isntvideo=true
  console.log(req.files.length);
  console.log("ad for update i recieved in nodejs (Backend)", bikelements)
  const query = {"_id": ObjectId(bikelements.id)}
  var data;
  if(req.files.length>1){
    isntvideo=false
    if(bikelements.Category==="Bike"){
      data = { 
        "Category": bikelements.Category,
        "adtitle": bikelements.adtitle, 
        "Model": bikelements.year,
        "addescription": bikelements.addescription,
        "brand": bikelements.brand,
        "Mileage": bikelements.Mileage,
        "condition": bikelements.condition,
        "adimg": req.files[0].filename,
        "advideo": req.files[1].filename,
        "price": parseInt(bikelements.price)
        
        
      } 
  
    }
    if(bikelements.Category==="Part"){
      data = { 
        "Category": bikelements.Category,
        "adtitle": bikelements.adtitle, 
        "addescription": bikelements.addescription,
        "BikePart": bikelements.BikePart,
        "condition": bikelements.condition,
        "adimg": req.files[0].filename,
        "advideo": req.files[1].filename,
        "price": parseInt(bikelements.price),
        "date": bikelements.date
        
        
      } 
  
    }

  }
  if(bikelements.Category==="Bike"&&isntvideo){
    data = { 
      "Category": bikelements.Category,
      "adtitle": bikelements.adtitle, 
      "Model": bikelements.year,
      "addescription": bikelements.addescription,
      "brand": bikelements.brand,
      "Mileage": bikelements.Mileage,
      "condition": bikelements.condition,
      "adimg": req.files[0].filename,
      "price": parseInt(bikelements.price)
      
      
    } 

  }
  if(bikelements.Category==="Part"&&isntvideo){
    data = { 
      "Category": bikelements.Category,
      "adtitle": bikelements.adtitle, 
      "addescription": bikelements.addescription,
      "BikePart": bikelements.BikePart,
      "condition": bikelements.condition,
      "adimg": req.files[0].filename,
      "price": parseInt(bikelements.price),
      "date": bikelements.date
      
      
    } 

  }

    const update = {
      "$set": data
    };
    db.collection('ads').findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Ad Updated'
    });

  
});
app.post('/imgupload',upload, function(req,res){
  console.log(req.body);
  
  console.log(req.files[0].filename);
  
  var isntvideo=true
  console.log(req.files.length);
  var bikelements = req.body;
 
  var data;
  
  console.log("Job i recieved in nodejs (Backend)", bikelements)
  db.collection('details').findOne({"email": bikelements.useremail}, function(err, creden) {
    console.log("name Found",creden.firstname,creden.lastname )
    var name=creden.firstname+' '+creden.lastname 
    if(req.files.length>1){
      console.log(req.files[1].filename);
      isntvideo=false
      if(bikelements.Category==="Bike"){
        data = { 
          "Category": bikelements.Category,
          "adtitle": bikelements.adtitle, 
          "Model": bikelements.year,
          "addescription": bikelements.addescription,
          "useremail": bikelements.useremail,
          "userid": bikelements.userid,
          "username": name,
          "brand": bikelements.brand,
          "Mileage": bikelements.Mileage,
          "condition": bikelements.condition,
          "adimg": req.files[0].filename,
          "advideo": req.files[1].filename,
          "price": parseInt(bikelements.price),
          "date": bikelements.date
          
          
        } 
    
      }
      if(bikelements.Category==="Part"){
        data = { 
          "Category": bikelements.Category,
          "adtitle": bikelements.adtitle, 
          "addescription": bikelements.addescription,
          "useremail": bikelements.useremail,
          "username": name,
          "userid": bikelements.userid,
          "BikePart": bikelements.BikePart,
          "condition": bikelements.condition,
          "adimg": req.files[0].filename,
          "advideo": req.files[1].filename,
          "price": parseInt(bikelements.price),
          "date": bikelements.date
          
          
        } 
    
      }
  
    }
    if(bikelements.Category==="Bike"&&isntvideo){
      data = { 
        "Category": bikelements.Category,
        "adtitle": bikelements.adtitle, 
        "Model": bikelements.year,
        "addescription": bikelements.addescription,
        "useremail": bikelements.useremail,
        "userid": bikelements.userid,
        "username": name,
        "brand": bikelements.brand,
        "Mileage": bikelements.Mileage,
        "condition": bikelements.condition,
        "adimg": req.files[0].filename,
        "price": parseInt(bikelements.price),
        "date": bikelements.date
        
        
      } 
  
    }
    if(bikelements.Category==="Part"&&isntvideo){
      data = { 
        "Category": bikelements.Category,
        "adtitle": bikelements.adtitle, 
        "addescription": bikelements.addescription,
        "useremail": bikelements.useremail,
        "username": name,
        "userid": bikelements.userid,
        "BikePart": bikelements.BikePart,
        "condition": bikelements.condition,
        "adimg": req.files[0].filename,
        "price": bikelements.price,
        "date": bikelements.date
        
        
      } 
  
    }
    
    console.log("Final ad data: ",data)
    db.collection('ads').insertOne(data,function(err, collection){ 
      if (err) throw err; 
      console.log("Ad inserted Successfully"); 
      
      return res.send({
        message: 'Ad inserted Successfully'
  
      });
            
  });
    
  }) 
  
  
})
app.post('/removesavead', function(req,res){
  console.log("ID: ",req.body.id)
  console.log("Useremail: ",req.body.useremail)
  db.collection('details').findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("creden Found",creden.favs)
    var favs1=creden.favs
    favs1 = favs1.filter(e => e !== req.body.id);
    console.log("updated favs of "+favs1)
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "favs": favs1,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
     console.log("Adddeleted")
     return res.send({
      message: 'Deleted',
      favs1:favs1
    });
});
})
app.get('/getusers', function(req,res){
  db.collection('details').find({}).toArray(function(err, users) {
    if (err) {
        console.log("Error mongo main hai")
        console.log(err);
    } else {
        res.json(users);
        console.log("Sent users to frontend", users)
    }
});

})
app.get('/getjobs', function(req,res){
  db.collection('ads').find({}).toArray(function(err, ads) {
    if (err) {
        console.log("Error mongo main hai")
        console.log(err);
    } else {
        var ads2=ads.reverse()
        res.json(ads2);
        console.log("Sent jobs to frontend", ads)
    }
});

})
app.get('/getjobs/:email', function(req,res){
  let email = req.params.email;
  console.log(email)
  db.collection('ads').find({"useremail":email}).toArray(function(err, ads) {
    if (err) {
        console.log("Error mongo main hai")
        console.log(err);
    } else {
        res.json(ads);
        console.log("Sent ads to frontend", ads)
    }
});

})
app.get('/:id', function(req,res){
  let id = req.params.id;
  db.collection('details').findOne({"_id": ObjectId(req.params.id)}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

})
app.get('/ad/:id', function(req,res){
  let id = req.params.id;
  db.collection('ads').findOne({"_id": ObjectId(req.params.id)}, function(err, ad) {
    console.log("ad Found",ad)
    res.json(ad)
});

})

app.get('/changeaccountsetting/:email', function(req,res){
  console.log(req.params.email)
  db.collection('details').findOne({"email": req.params.email}, function(err, details) {
    console.log("user details Found",details)
    res.json(details)
});

})
function Unfollowing(Demail,Recieptemail) {
  db.collection('details').findOne({"email": Demail}, function(err, creden) {
    console.log("creden Found",creden.following)
    var UD=creden.following
    const index = UD.indexOf(Recieptemail);
    if (index > -1) {
      UD.splice(index, 1);
    }
    console.log("updated following of logged "+UD)
    const query = {"email": Demail}

    const update = {
      "$set": {
        "following": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
db.collection('details').findOne({"email": Recieptemail}, function(err, creden) {
  console.log("creden Found",creden.followers)
  var UD=creden.followers
  const index = UD.indexOf(Demail);
  if (index > -1) {
    UD.splice(index, 1);
  }
  console.log("updated followers of profile "+UD)
  const query = {"email": Recieptemail}

  const update = {
    "$set": {
      "followers": UD,
      
    }
  };
  db.collection('details').findOneAndUpdate(query,update)
});
  
}
function Following(Pemail,LUemail2) {
  db.collection('details').findOne({"email": Pemail}, function(err, creden) {
    console.log("followers Found",creden.followers)
    var UD=creden.followers
    UD.push(LUemail2)
    console.log("updated followers of po "+UD)
    const query = {"email": Pemail}

    const update = {
      "$set": {
        "followers": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
db.collection('details').findOne({"email": LUemail2}, function(err, creden) {
  console.log("following Found",creden.following)
  var UD=creden.following
  UD.push(Pemail)
  console.log("updated following of lu "+UD)
  const query = {"email": LUemail2}

  const update = {
    "$set": {
      "following": UD,
      
    }
  };
  db.collection('details').findOneAndUpdate(query,update)
});
}
app.post('/handlefriendbutton', function(req,res){
  console.log(req.body)
  
  if(req.body.profilestatus==="Not Anything"){
    console.log("hey backend, you have add "+req.body.Pemail+" id to "+req.body.LUemail2+" Following List")
    console.log("hey backend, you have add "+req.body.LUemail2+" id to "+req.body.Pemail+" Followers List")
    Following(req.body.Pemail,req.body.LUemail2)
  }
  if(req.body.profilestatus==="Following"){
    console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" Following ")
    console.log("hey backend, you have remove "+req.body.LUemail2+" id from "+req.body.Pemail+" Followers ")
    Unfollowing(req.body.LUemail2,req.body.Pemail)
  }
  return res.send({
    message: 'Successful'

  });

})
app.post('/updatesetting',upload, function (req, res) {
  var updatedprofile = req.body;
  console.log(req.files[0].filename)
  console.log("UP for update i recieved in nodejs (Backend)", updatedprofile)
  bcrypt.hash(updatedprofile.pass, saltRounds, async (err, hash) => {
    const query = {"email": updatedprofile.email}
    var data={
      "firstname":updatedprofile.fname,
      "lastname":updatedprofile.lname,
      "email":updatedprofile.nemail,
      "propic":req.files[0].filename,
      "address":updatedprofile.address,
      "password":hash,
    }
    const update = {
      "$set": data
    };
    db.collection('details').findOneAndUpdate(query,update)
    return res.send({
      message: 'Profile updated Successfully'
    });

  
  

});
});


app.post('/banuser', function(req,res){
  console.log(req.body.useremail)
  db.collection('details').findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("isbanned? ",creden.isbanned)
    var newban=true
    
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "isbanned": newban,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Congrats',
      
    });
});
})
app.post('/unbanuser', function(req,res){
  console.log("User email:",req.body.useremail)
  db.collection('details').findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("isbanned? ",creden.isbanned)
    var newban=false
    
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "isbanned": newban,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Congrats',
      
    });
});
})
app.post('/sign-up',upload, function (req, res) {
  var countValue = req.body;
  console.log(req.files[0].filename)
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  db.collection('details').findOne({email:countValue.email},function(err,user){
    if(user) return res.status(400).send({ auth : false, message :"Email Already Exits"});
  
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "password":hash,
    "followers": [],
    "following":[],
    "isbanned": false,
    "propic":req.files[0].filename,
    "address": countValue.address,
    "favs": []
    



} 
console.log("HashedPwd: ", hash)
  db.collection('details').insertOne(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    res.status(400).send({ auth : true, message :"You are now a user please login"});
          
}); 
});
});

});

  app.post('/adminsign-in', function (req, res) {
    var countValue = req.body;
    console.log("U are ", countValue);
    db.collection('admin').findOne({ id: countValue.id }, function(err, collection){
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
              
            });
          }else{
            return res.send({
              success: false,
              message: 'Error: Admin ID and Pass Dont Match'
            });
           
          }
        });
          
        }else{
          console.log("Admin not found");
          return res.send({
            success: false,
            message: 'Error: Incorrect Admin, Recheck Your Admin ID'
          });
        }
      }
       
    });
    
  
  })

app.post('/sign-in', function (req, res) {
  var countValue = req.body;
  console.log("U are ", countValue.email);
  
db.collection('details').findOne({ email: countValue.email }, function(err, collection){
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
        if(collection.isbanned){
          return res.send({
            success: false,
            message: 'You are banned by Admin'
          });

        }
        return res.send({
          success: true,
          message: 'Correct Details',
          fname: collection.firstname,
          lname: collection.lastname,
          id: collection._id,
          following: collection.following,
          favs: collection.favs
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
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})