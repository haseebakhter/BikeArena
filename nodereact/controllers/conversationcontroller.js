var ObjectId = require('mongodb').ObjectID;
const bcrypt = require("bcrypt")
var userModel = require('../models/usermodel')
var conversationModel = require('../models/conversation')
var messageModel = require('../models/message')
var mechanicModel = require('../models/mechanicmodel')
exports.getConversations = async function(req,res){ 
  console.log(req.params.userId)
  try {
    const conversation = await conversationModel.find({
      members: { $in: [req.params.userId] },
    }).sort({"created_at": 1});
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
      
}
exports.getMessages = async function(req,res){ 
    console.log(req.params.conversationId)
    try {
        const messages = await messageModel.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
        
  }
  exports.getConversation = async function(req,res){ 
    console.log(req.params.firstUserId, req.params.secondUserId)
    try {
        const conversation = await conversationModel.findOne({
          members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
      } catch (err) {
        res.status(500).json(err);
      }
        
  }
  exports.newConversation = async function(req,res){ 
    console.log(req.body.senderId, req.body.receiverId)
    const newConversation = new conversationModel({
        members: [req.body.senderId, req.body.receiverId],
      });
    
      try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
        
  }
 
  exports.getConversationByID = async function(req,res){ 
    console.log(req.params.conversationId)
    try {
        const conversation = await conversationModel.findOne({
          "_id": ObjectId(req.params.conversationId),
        });
        res.send(conversation)
      } catch (err) {
        res.status(500).json(err);
      }
        
  }
  exports.newMessage = async function(req,res){ 
    console.log(req.body.sender, req.body.text, req.body.conversationId, req.body.td)
    const newMessage = new messageModel({
      conversationId: req.body.conversationId,
      sender: req.body.sender,
      text: req.body.text,
      SentAt: req.body.td
      });
    
      try {
        const savedMessage = await newMessage.save();
        await conversationModel.findOne({"_id": ObjectId(req.body.conversationId)}, function(err, conversation) {
          console.log("conversation Found",conversation)
          conversation.totalmessages=conversation.totalmessages+1
          return conversation.save()
      });
        res.status(200).json(savedMessage);
      } catch (err) {
        res.status(500).json(err);
      }
        
  }