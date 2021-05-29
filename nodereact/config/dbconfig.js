import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose'); 
 
 mongoose.Promise = global.Promise;
 
 mongoose.connect('mongodb+srv://holyshit:Dw3mYjjyy4Tncuqw@cluster0.gugxo.mongodb.net/BikeBazaar?retryWrites=true/BikeBazaar', {
  dbName: 'BikeBazaar',
  user: 'holyshit',
  pass: 'Dw3mYjjyy4Tncuqw',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
 }, function (err) {
 
  if (err) throw err;
  
  console.log('Successfully connected');
  
  });
 //mongoose.connect('mongodb://localhost:27017/Jobweb', function (err) {
 
  //  if (err) throw err;
  
  //  console.log('Successfully connected');
  
 //});
 var db=mongoose.connection;
 export default db