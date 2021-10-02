
const express = require('express')
const http = require('http')
const app = express()
require('dotenv').config()

const db = require('./config/dbconfig.js')
var bodyParser = require('body-parser')
const port = 5000
var cors = require('cors')
const server = http.createServer(app)
const socketio = require('socket.io')
app.use(cors())
 
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json()) 

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})
io.on('connection', (socket)=>{
  console.log('we have a new connection!!!')
  socket.on('join',({conversationid}, callback)=>{
    console.log(conversationid)
    const error = true
    if(error){
      callback({error: 'error'})
    }
  })
  socket.on('disconnect',()=>{
    console.log('user had left')
  })
})
var adminroutes1 = require('./routes/adminroutes');
var userroutes1 = require('./routes/userroutes');
var adsroutes1 = require('./routes/adsroutes');
var mechanicroutes1 = require('./routes/mechanicroutes');
var conversationroutes1 = require('./routes/conversationroutes');
app.use(adsroutes1);
app.use(userroutes1);
app.use(adminroutes1)
app.use(mechanicroutes1)
app.use(conversationroutes1)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})