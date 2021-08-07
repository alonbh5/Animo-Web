const BotRes = require('../models/botRes');
const mongoose = require('mongoose');

module.exports = {
    getAllBotRes:  (req , res)=>{
        BotRes.find().then((allBotRes)=>{

            res.status(200).json({
            allBotRes
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });    

        
    },

    createBotRes : (req , res)=>{
        const {response_type, content, response_to } = req.body;        

        const botRes = new BotRes({
            _id: new mongoose.Types.ObjectId(),
            response_type,            
            content,
            response_to
        });

        botRes.save().then(()=>{
            res.status(200).json({
            message: `created a new Bot Res - ${content}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });
                
    },

    getBotRes : (req , res)=>{
        const botResId = req.params.botResId;

        BotRes.findById(botResId).then((BotResRes)=>{
            res.status(200).json({
                BotResRes
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },

    updateBotRes : (req , res)=>{
        const botResId = req.params.botResId;

        BotRes.updateOne({_id: botResId}, req.body).then(()=>{
             res.status(200).json({
            message: `update bot res - ${botResId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

       
    },

    deleteBotRes: (req , res)=>{
        const botResId = req.params.botResId;    
        
        BotRes.deleteOne({_id: botResId}).then(()=>{
            res.status(200).json({
            message: `delete text - ${botResId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

        
    }
}