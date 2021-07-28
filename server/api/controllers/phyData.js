const PhyData = require('../models/phyData');
const mongoose = require('mongoose');

module.exports = {
    getAllTexts:  (req , res)=>{
        PhyData.find().then((allTextsRes)=>{

            res.status(200).json({
            allTextsRes
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });    

        
    },

    createText : (req , res)=>{
        const {
            data_type,
            link,
            author,
            title,
            emotions,
            created_by} = req.body;
        
        const confirm = false;

        const phyData = new PhyData({
            _id: new mongoose.Types.ObjectId(),
            data_type,
            link,
            author,
            title,
            emotions,
            created_by,
            confirm
        });

        phyData.save().then(()=>{
            res.status(200).json({
            message: `created a new text - ${title}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });
                
    },

    getText : (req , res)=>{
        const textId = req.params.textId;

        PhyData.findById(textId).then((TextRes)=>{
            res.status(200).json({
                TextRes
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },

    updateText : (req , res)=>{
        const textId = req.params.textId;

        PhyData.updateOne({_id: textId}, req.body).then(()=>{
             res.status(200).json({
            message: `update text - ${textId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

       
    },

    deleteText: (req , res)=>{
        const textId = req.params.textId;    
        
        PhyData.deleteOne({_id: textId}).then(()=>{
            res.status(200).json({
            message: `delete text - ${textId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

        
    }
}