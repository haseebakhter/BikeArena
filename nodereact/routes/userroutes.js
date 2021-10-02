var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/usercontroller');
const multer = require('multer')
var mechanic_controller = require('../controllers/mechaniccontroller');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../myfrontend/public/content')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).array('file');
 
    
    router.post('/sign-up',upload,user_controller.signup)
    router.post('/additionalsign-up',upload,user_controller.additionalsignup)
    router.post('/sign-in',user_controller.signin)
    router.post('/updatesetting',upload,user_controller.updatesettings)
    router.post('/getuserIDName',user_controller.getuserIDName)
    router.get('/changeaccountsetting/:email',user_controller.getuserByEmail)
    router.post('/facebooksign-in',user_controller.facebooklogin)
    router.get('/getusers',user_controller.getUsers)
    router.get('/mycart/:email',user_controller.mycart)
    router.get('/getallmechanics',mechanic_controller.getAllmechanics)
    router.get('/user/:id',user_controller.getuserByID)
    router.post('/handlefriendbutton',user_controller.handlefriendbutton)
    router.post('/forgetpassword',user_controller.forgetpassword)
    router.post('/nextforgetpassword',user_controller.nextforgetpassword)
           module.exports = router;
