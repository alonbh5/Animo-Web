const PersQuiz = require('../schemes/persQuiz');
const mongoose = require('mongoose');

module.exports = {
    getAllPersQuiz:  (req , res)=>{
        PersQuiz.find().then((allPersQuiz)=>{

            res.status(200).json({
            allPersQuiz
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });    

        
    },

    createPersQuiz : (req , res)=>{
        const {question, relateTo, opposite } = req.body;

        const persQuiz = new PersQuiz({
            _id: new mongoose.Types.ObjectId(),
            question,            
            relateTo,
            opposite
        });

        persQuiz.save().then(()=>{
            res.status(200).json({
            message: `created a new question - ${question}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });
                
    },

    getPersQuiz : (req , res)=>{
        const persQuizId = req.params.persQuizId;

        PersQuiz.findById(persQuizId).then((persQuiz)=>{
            res.status(200).json({
                persQuiz
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },

    updatePersQuiz : (req , res)=>{
        const persQuizId = req.params.persQuizId;

        PersQuiz.updateOne({_id: persQuizId}, req.body).then(()=>{
             res.status(200).json({
            message: `update qustion - ${persQuizId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

       
    },

    deletePersQuiz: (req , res)=>{
        const persQuizId = req.params.persQuizId;
        
        PersQuiz.deleteOne({_id: persQuizId}).then(()=>{
            res.status(200).json({
            message: `delete text - ${persQuizId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

        
    }
}