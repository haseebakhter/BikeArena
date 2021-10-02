var express = require('express');
var router = express.Router();
var mechanic_controller = require('../controllers/mechaniccontroller');
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
 
    
    router.post('/mechanicsign-up',upload,mechanic_controller.signup)
    //router.get('/getmm',mechanic_controller.getAllmechanics)
    router.post('/mechanicsign-in',mechanic_controller.signin)
    router.get('/mechanic/:id',mechanic_controller.getuserByID)
    //router.get('allmechanics',mechanic_controller.getAllmechanics)
    module.exports = router;
