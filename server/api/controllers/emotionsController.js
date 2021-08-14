const Emotion = require('../schemes/emotionsSchema');
const mongoose = require('mongoose');

module.exports = {
    getAllEmotions:  (req , res)=>{
        Emotion.find().then((allEmotions)=>{

            res.status(200).json({
            allEmotions
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });    

        
    },

    createEmotion : (req , res)=>{
        const {key_name, name} = req.body;

        const emotion = new Emotion({
            _id: new mongoose.Types.ObjectId(),
            key_name,            
            name
        });

        emotion.save().then(()=>{
            res.status(200).json({
            message: `created a new emotion - ${key_name}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });
                
    },

    getEmotion : (req , res)=>{
        const emotionId = req.params.emotionId;

        Emotion.findById(emotionId).then((emotionRes)=>{
            res.status(200).json({
                emotionRes
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },

    updateEmotion : (req , res)=>{
        const emotionId = req.params.emotionId;

        Emotion.updateOne({_id: emotionId}, req.body).then(()=>{
             res.status(200).json({
            message: `update Emotion - ${emotionId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

       
    },

    deleteEmotion: (req , res)=>{
        const emotionId = req.params.emotionId;
        
        Emotion.deleteOne({_id: emotionId}).then(()=>{
            res.status(200).json({
            message: `delete Emotion - ${emotionId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

        
    }
}