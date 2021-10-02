var express = require('express');
var router = express.Router();
var ads_controller = require('../controllers/adscontroller');
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
 
    
    router.get('/getjobs',ads_controller.getads)
    router.post('/deletead',ads_controller.deletead)
    router.post('/imgupload',upload,ads_controller.addad)
    router.get('/getufavs/:email',ads_controller.getFavs)
    router.post('/updatejob',upload,ads_controller.updatejob)
    router.post('/savead',ads_controller.savead)
    router.post('/addtocart',ads_controller.addtocart)
    router.post('/removefromcart',ads_controller.removefromcart)
    router.get('/ad/:id',ads_controller.getAdbyID)
    router.get('/getjobs/:email',ads_controller.getAdbyUserEmail)
    router.post('/removesavead',ads_controller.removeSavedAd)
    router.post('/payment',ads_controller.payment)
    router.get('/getpurchases',ads_controller.getpurchases)
    router.get('/getuserpurchases/:id',ads_controller.getuserpurchases)    
           module.exports = router;
