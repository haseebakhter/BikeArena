
var ObjectId = require('mongodb').ObjectID;
const stripe = require('stripe')("sk_test_51JI9qWSIjYjIFUxNnPl7pS5Wyx2opYfgTh0gh3ubRVDOrDgMXcQAuyVGXcfXzcmVrHT5HXuPlLp906rcgt8Oa0NP005C8GuXOY");
var userModel = require('../models/usermodel')
var purchaseModel = require('../models/purchasemodel')
var adsModel = require('../models/adsmodel')
var adminModel = require('../models/adminmodel')
exports.getads =async function(req,res){ 
    const filter = {};
    const all = await adsModel.find(filter);
    res.json(all.reverse())

      
}
exports.deletead =async function(req,res){ 
  console.log("we deleting")
  console.log(req.body.id)
  adsModel.findOneAndDelete({'_id': ObjectId(req.body.id)}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });

      
}

exports.addad =async function(req,res){ 
  console.log(req.body);
  
  //console.log("File 1 ",req.files[0].filename);
  //console.log("File 2 ",req.files[1].filename);
  //console.log("File 3 ",req.files[2].filename);
  //console.log("File 4 ",req.files[3].filename);
  //console.log("File 5 ",req.files[4].filename);
  
  var isntvideo=true
  console.log(req.files.length);
  var bikelements = req.body;
 
  var data;
  
  console.log("Job i recieved in nodejs (Backend)", bikelements)
  console.log("does it have video?", bikelements.isvideo);
  console.log("Video: ", req.files[0].filename);
  
  userModel.findOne({"email": bikelements.useremail}, function(err, creden) {
    console.log("name Found",creden.firstname,creden.lastname )
    var name=creden.firstname+' '+creden.lastname 
    
    
    
      if(bikelements.Category==="Bike"&&bikelements.isvideo==="true"){
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
          "city": bikelements.city,
          "adimg": req.files[1]?req.files[1].filename:null,
          "adimg2": req.files[2]?req.files[2].filename:null,
          "adimg3": req.files[3]?req.files[3].filename:null,
          "adimg4": req.files[4]?req.files[4].filename:null,
          "advideo": req.files[0].filename,
          "price": parseInt(bikelements.price),
          "date": bikelements.date
          
          
        } 
        console.log("Data BIKE TRUE", data)
      }
      if(bikelements.Category==="Part"&&bikelements.isvideo==="true"){
        data = { 
          "Category": bikelements.Category,
          "adtitle": bikelements.adtitle, 
          "addescription": bikelements.addescription,
          "useremail": bikelements.useremail,
          "username": name,
          "userid": bikelements.userid,
          "BikePart": bikelements.BikePart,
          "condition": bikelements.condition,
          "city": bikelements.city,
          "adimg": req.files[1]?req.files[1].filename:null,
          "adimg2": req.files[2]?req.files[2].filename:null,
          "adimg3": req.files[3]?req.files[3].filename:null,
          "adimg4": req.files[4]?req.files[4].filename:null,
          "advideo": req.files[0].filename,
          "price": parseInt(bikelements.price),
          "date": bikelements.date
          
          
        } 
        console.log("Data PART TRUE", data)
      }
  
    
    if(bikelements.Category==="Bike"&&bikelements.isvideo==="false"){
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
        "city": bikelements.city,
        "adimg": req.files[1]?req.files[0].filename:null,
        "adimg2": req.files[1]?req.files[1].filename:null,
        "adimg3": req.files[2]?req.files[2].filename:null,
        "adimg4": req.files[3]?req.files[3].filename:null,
        "price": parseInt(bikelements.price),
        "date": bikelements.date
        
        
      } 
      console.log("Data BIKE FALSE", data)
  
    }
    if(bikelements.Category==="Part"&&bikelements.isvideo==="false"){
      data = { 
        "Category": bikelements.Category,
        "adtitle": bikelements.adtitle, 
        "addescription": bikelements.addescription,
        "useremail": bikelements.useremail,
        "username": name,
        "userid": bikelements.userid,
        "BikePart": bikelements.BikePart,
        "condition": bikelements.condition,
        "city": bikelements.city,
        "adimg": req.files[0]?req.files[0].filename:null,
        "adimg2": req.files[1]?req.files[1].filename:null,
        "adimg3": req.files[2]?req.files[2].filename:null,
        "adimg4": req.files[3]?req.files[3].filename:null,
        "price": bikelements.price,
        "date": bikelements.date
        
        
      } 
      console.log("Data PART FALSE", data)
    }
    
    console.log("Final ad data: ",data)
    adsModel.create(data,function(err, collection){
      console.log("ad ID: ",collection._id) 
      if (err) throw err; 
      console.log("Ad inserted Successfully"); 
      
      return res.send({
        AdID:collection._id,
        message: 'Ad inserted Successfully'
  
      });
      
            
  });
  
    
  }) 
  
  
  
 

      
}
exports.updatejob = function(req,res){ 
  var bikelements = req.body;
  var isntvideo=true
  console.log(req.files.length);
  console.log("ad for update i recieved in nodejs (Backend)", bikelements)
  const query = {"_id": ObjectId(bikelements.id)}
  var data;
  adsModel.findOne({"_id": ObjectId(bikelements.id)}, async function(err, ad) {
    console.log("ad Found",ad)

  
    if(bikelements.Category==="Bike"&&bikelements.isvideo==="true"){
      console.log("editing")
        ad.Category= bikelements.Category,
        ad.adtitle= bikelements.adtitle, 
        ad.Model= bikelements.year,
        ad.addescription= bikelements.addescription,
        ad.brand= bikelements.brand,
        ad.Mileage= bikelements.Mileage,
        ad.condition= bikelements.condition,
        ad.city=bikelements.city,
        ad.adimg=req.files[1]?req.files[1].filename:ad.adimg,
        ad.adimg2= req.files[2]?req.files[2].filename:ad.adimg2,
        ad.adimg3= req.files[3]?req.files[3].filename:ad.adimg3,
        ad.adimg4=req.files[4]?req.files[4].filename:ad.adimg4,
        ad.advideo= req.files[0]?req.files[0].filename:ad.advideo,
        ad.price= parseInt(bikelements.price)
        
        
      
  
    }
    if(bikelements.Category==="Part"&&bikelements.isvideo==="true"){
      console.log("editing")
        ad.Category= bikelements.Category,
        ad.adtitle= bikelements.adtitle, 
        ad.addescription= bikelements.addescription,
        ad.BikePart= bikelements.BikePart,
        ad.condition= bikelements.condition,
        ad.city=bikelements.city,
        ad.adimg= req.files[1]?req.files[1].filename:ad.adimg,
        ad.adimg2= req.files[2]?req.files[2].filename:ad.adimg2,
        ad.adimg3= req.files[3]?req.files[3].filename:ad.adimg3,
        ad.adimg4= req.files[4]?req.files[4].filename:ad.adimg3,
        ad.advideo= req.files[0]?req.files[0].filename:ad.advideo,
        ad.price=parseInt(bikelements.price),
        ad.date= bikelements.date
        
        
      
  
    }

  
  if(bikelements.Category==="Bike"&&bikelements.isvideo==="false"){
    console.log("editing")
      ad.Category= bikelements.Category,
      ad.adtitle= bikelements.adtitle, 
      ad.Model=bikelements.year,
      ad.addescription= bikelements.addescription,
      ad.brand= bikelements.brand,
      ad.Mileage= bikelements.Mileage,
      ad.condition= bikelements.condition,
      ad.city=bikelements.city,
      ad.adimg= req.files[0]?req.files[0].filename:ad.adimg,
      ad.adimg2= req.files[1]?req.files[1].filename:ad.adimg2,
      ad.adimg3= req.files[2]?req.files[2].filename:ad.adimg3,
      ad.adimg4= req.files[3]?req.files[3].filename:ad.adimg4,
      ad.price= parseInt(bikelements.price)
      
      
     

  }
  if(bikelements.Category==="Part"&&bikelements.isvideo==="false"){
     console.log("editing")
      ad.Category= bikelements.Category,
      ad.adtitle= bikelements.adtitle, 
      ad.addescription= bikelements.addescription,
      ad.BikePart= bikelements.BikePart,
      ad.condition= bikelements.condition,
      ad.city=bikelements.city,
      ad.adimg= req.files[0]?req.files[0].filename:ad.adimg,
      ad.adimg2= req.files[1]?req.files[1].filename:ad.adimg2,
      ad.adimg3= req.files[2]?req.files[2].filename:ad.adimg3,
      ad.adimg4= req.files[3]?req.files[3].filename:ad.adimg4,
      ad.price= parseInt(bikelements.price),
      ad.date= bikelements.date
      
      
    

  }
  return ad.save()
    

  }); 
  return res.send({
    success: true,
    message: 'Ad Updated'
  });   
}
exports.getFavs = function(req,res){ 
  console.log("get saved ads of: ",req.params.email)
  userModel.findOne({"email": req.params.email}, function(err, creden) {
    console.log("creden Found",creden.favs)
    var favs1=creden.favs
    res.send(favs1)
  })

  
 

      
}
exports.addtocart = function(req,res){ 
  console.log(req.body.id)
  console.log(req.body.useremail)
  userModel.findOne({"email": req.body.useremail}, async function(err, creden) {
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "cart": req.body.id
        
      }
    };
    await userModel.findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Added To Cart'
    });
});

  
 

      
}
exports.removefromcart = function(req,res){ 
  console.log(req.body.id)
  console.log(req.body.useremail)
  userModel.findOne({"email": req.body.useremail}, async function(err, creden) {
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "cart": null
        
      }
    };
    await userModel.findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Removed From Cart'
    });
});

  
 

      
}
exports.savead = function(req,res){ 
  console.log(req.body.id)
  console.log(req.body.useremail)
  userModel.findOne({"email": req.body.useremail}, async function(err, creden) {
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
    await userModel.findOneAndUpdate(query,update)
    return res.send({
      success: true,
      message: 'Ad Saved',
      favs:favs1
    });
});

  
 

      
}
exports.getAdbyID = function(req,res){ 
  let id = req.params.id;
  console.log("getting ad of: ", id)
  adsModel.findOne({"_id": ObjectId(req.params.id)}, function(err, ad) {
    console.log("ad Found",ad)
    res.json(ad)
});
 

      
}
exports.getAdbyUserEmail = async function(req,res){ 
  let email = req.params.email;
  console.log(email)
  //adsModel.find({"useremail":email}).toArray(function(err, ads) {
    const filter = {"useremail":email};
    const all = await adsModel.find(filter);
    res.json(all.reverse())
 

      
}
exports.removeSavedAd = async function(req,res){ 
  console.log("ID: ",req.body.id)
  console.log("Useremail: ",req.body.useremail)
  var favs1=[];
  await userModel.findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("creden Found",creden.favs)
    favs1=creden.favs
    favs1 = favs1.filter(e => e !== req.body.id);
    console.log("updated favs of "+favs1)
    creden.favs=favs1
    return creden.save()
     
});
console.log("returning updated favs: ", favs1)
return res.send({
  message: 'Deleted',
  favs1:favs1
});
 

      
}
exports.payment = async function(req,res){ 
  console.log(req.body)
  
  const charge = await stripe.charges.create({
    amount: req.body.amount,
    source: `${req.body.cardToken.name}`,
    currency: 'INR',
    source: req.body.cardToken.id,
    description: "First Test Charge"

    });
    adsModel.findOne({"_id": ObjectId(req.body.adid)}, function(err, ad) {
      console.log("ad Found",ad)
      ad.issold=true
      
      return ad.save()
  });
  userModel.findOne({"_id": ObjectId(req.body.adholderid)}, function(err, profile) {
    console.log("profile Found",profile)
    profile.credits=req.body.amount
    return profile.save()
});
var data = { 
  PurchasedBy: req.body.userid,
  PurchasedFrom: req.body.adholderid,
  PurchasedAd: req.body.adid,
  } 
await purchaseModel.create(data,function(err, collection){ 
  if (err) throw err; 
  console.log("Purchase inserted Successfully"); 
        
});

    console.log(charge)
    return res.send({
      success:true,
      message: 'Payment SuccessFull',
      charge: charge
    });

 

      
}
exports.getpurchases =async function(req,res){ 
  const filter = {};
  const all = await purchaseModel.find(filter).populate({
    path:"PurchasedBy",
    model: "details"
  }).populate({
      path:"PurchasedFrom",
      model: "details"
     }).populate({
      path:"PurchasedAd",
      model: "ads"
     });
  res.json(all.reverse())

    
}
exports.getuserpurchases =async function(req,res){ 
  console.log(req.params.id)
  const filter = {};
  const all = await purchaseModel.find().or([{ PurchasedBy: ObjectId(req.params.id)}, { PurchasedFrom: ObjectId(req.params.id)}]).populate({
    path:"PurchasedBy",
    model: "details"
  }).populate({
      path:"PurchasedFrom",
      model: "details"
     }).populate({
      path:"PurchasedAd",
      model: "ads"
     });
  res.json(all.reverse())

    
}