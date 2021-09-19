const Analyze = require('../schemes/analyzeSchema');
const mongoose = require('mongoose');

module.exports = {
    getAllAnalyze:  (req , res)=>{
        Analyze.find().then((allConversation)=>{
            res.status(200).json({
            allConversation
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });         
    },

    createAnalyze : (req , res)=>{
        const {emotionId, question} = req.body;

        const analyze = new Analyze({
            _id: new mongoose.Types.ObjectId(),
            emotionId,            
            question
        });      

        analyze.save().then(()=>{
            res.status(200).json({
            message: `created a new Analyze - ${question}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });                
    },

    getAnalyze : (req , res)=>{
        const analyzeId = req.params.analyzeId;

        Analyze.findById(analyzeId).then((analyze)=>{
            res.status(200).json({
                analyze
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },  

    deleteAnalyze: (req , res)=>{
        const analyzeId = req.params.analyzeId;
        
        Analyze.deleteOne({_id: analyzeId}).then(()=>{
            res.status(200).json({
            message: `deleted analyze - ${analyzeId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });         
    }
}