var express = require('express');
var router = express.Router();
var conversation_controller = require('../controllers/conversationcontroller');

 
    
router.get('/getConversations/:userId',conversation_controller.getConversations)
router.get('/getMessages/:conversationId',conversation_controller.getMessages)     
router.get('/getConversation/:firstUserId/:secondUserId',conversation_controller.getConversation)
router.get('/getConversationByID/:conversationId',conversation_controller.getConversationByID)
router.post('/newConversation',conversation_controller.newConversation)    
router.post('/newMessage',conversation_controller.newMessage)    
    module.exports = router;
