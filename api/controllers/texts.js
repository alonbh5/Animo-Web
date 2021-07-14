const Text = require('../models/texts');
const mongoose = require('mongoose');

module.exports = {
    getAllTexts:  (req , res)=>{
        Text.find().then((allTextsRes)=>{

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
        const {title, descruotion, content } = req.body;

        const text = new Text({
            _id: new mongoose.Types.ObjectId(),
            title,
            descruotion,
            content
        });

        text.save().then(()=>{
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

        Text.findById(textId).then((TextRes)=>{
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

        res.status(200).json({
            message: `update text - ${textId}`
        })
    },

    deleteText: (req , res)=>{
        const textId = req.params.textId;

        res.status(200).json({
            message: `delete text - ${textId}`
        })
    }
}