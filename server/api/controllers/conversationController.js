const Conversation = require('../schemes/conversationSchema');
const mongoose = require('mongoose');

module.exports = {
    getAllConversation:  (req , res)=>{
        Conversation.find().then((allConversation)=>{

            res.status(200).json({
            allConversation
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });    

        
    },

    createConversation : (req , res)=>{
        const {question, keyWords,isPersonal,indexInQuestion} = req.body;

        const conversation = new Conversation({
            _id: new mongoose.Types.ObjectId(),
            question,            
            keyWords,
            isPersonal,
            indexInQuestion
        });

        for (let index = 0; index < keyWords.length; index++) {
            keyWords[index] = keyWords[index].toLowerCase().trim();            
        }        

        conversation.save().then(()=>{
            res.status(200).json({
            message: `created a new conversation - ${question}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });
                
    },

    getConversation : (req , res)=>{
        const conversationId = req.params.conversationId;

        Conversation.findById(conversationId).then((conversation)=>{
            res.status(200).json({
                conversation
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },

    updateConversation : (req , res)=>{
        const conversationId = req.params.conversationId;

        Conversation.updateOne({_id: conversationId}, req.body).then(()=>{
             res.status(200).json({
            message: `update qustion - ${conversationId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

       
    },

    deleteConversation: (req , res)=>{
        const conversationId = req.params.conversationId;
        
        Conversation.deleteOne({_id: conversationId}).then(()=>{
            res.status(200).json({
            message: `deleted conversation - ${conversationId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

        
    }
}