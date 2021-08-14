const BotRes = require('../schemes/botResSchema');
const mongoose = require('mongoose');
const { request } = require('express');

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

        
    },

    StartPersQuiz: async (req,res)=>{

        const userController = await require('../controllers/usersController');
        const User = await require('../models/userSchema');
        const userId = await req.params.userId;
        
        //console.log("before ans");
        let ans = await userController.createQuiz(req); 
        //console.log(`after ans is ${ans}`);        
        
        if (ans === true){   

            //console.log(`now im in (ans === true)`);
            await User.findOne({ '_id': userId}, {}, {sort: { date: -1 }},async function(err, record){
                  
                //console.log(`now im in after i findONE (going to send resulte)`);
                               
                const botRes = await new BotRes({
                    _id: new mongoose.Types.ObjectId(),
                    response_type: "First Personality Test Question",            
                    content: record.persQuiz,
                    response_to: "StartPersQuiz"
                });

                res.status(200).json({
                    botRes
                    });

            }).catch(error => {
                res.status(404).json({
                massage: "user is not in DB"
                })
            });
            
        }        
        else
        {
            res.status(500).json({
                massage: "User was not found"
                })
        }
        
           
            
    },

    AnswerPersQuiz: async (req,res) => {
        /*
        this if after you used StartPersQuiz
        Gets: Relevent UserID, QuestionID for question x and an Answer for x
        return:bot res with
            if not all done : content is next qurstion, response_type of "Pers Question"
            if all is done : content is personlity Type, response_type of "Pers-Res"
        */

       const userId = req.params.userId;

       const userController = require('../controllers/usersController');
       const User = require('../models/userSchema');    

          
      // console.log(`before ans`);
       let ans = await userController.addQuizAns(req);
       //console.log(`after is ${ans}`);
       
       if (ans === true) {
           // console.log(`2 before is ${ans}`);
           ans = await userController.persCalc(req);
           //console.log(`2 after is ${ans}`);

           if (ans === true) {
            await User.findOne({ '_id': userId}, {}, {sort: { date: -1 }},async function(err, record){
                  
                
                res.status(200).json({
                    massage: "user has new personality",
                    resulte: record.personality,
                    });

            }).catch(error => {
                res.status(404).json({
                massage: "user is not in DB"
                })
            });
           }
           else{
            res.status(504).json({
                massage: "somthing went worng, are you sure answers is in range [-1,3]?"
                })
           }
       }else{
        res.status(504).json({
            massage: "Unknown Error"
            })
       }
    }

    
}