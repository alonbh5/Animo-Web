const User = require('../models/users');
const mongoose = require('mongoose');
const { connect } = require('mongodb');

module.exports = {
    getAllUsers:  (req , res)=>{
        User.find().then((allUsers)=>{

            res.status(200).json({
            allUsers
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });    

        
    },

    createUsers : (req , res)=>{        

        const {role_id,
             first_name,
             last_name,
             email,
             password,
             age,
             gender,             
            } = req.body;

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            role_id,
             first_name,
             last_name,
             email,
             password,
             age,
             gender,             
        });

        user.save().then(()=>{
            res.status(200).json({
            message: `created a new User - email is ${email} `
             })
        }).catch(error => {            
            res.status(500).json({
            error
            })
        });
                
    },

     getUsers: async (req , res) => {
        const email = req.query.email;
        const password = req.query.password;        

        try {
            const allUsers = await User.find();
            const matchUser = allUsers.find((user) =>  user.password === password && user.email === email);
            if (matchUser) {
                res.status(200).json(matchUser)
            }
            else
            {
            res.status(404).json({
                error: `user with email ${email} password: ${password} was not found!`
            })
        }
        } catch(error) {
            res.status(500).json({error})
        }
    
    },

    updateUsers : (req , res)=>{
        const userId = req.params.userId;

        
        User.findById(userId).then((theUser)=>{
            if(!theUser) {
                return res.status(404).json({
                    message: "User Was not Found, check _ID"
                })
            }
            else {               
                User.updateOne({_id: userId}, req.body).then(()=>{
                   res.status(200).json({
                   message: `update user - ${userId}`
                   })                   
            })
        }
        }).catch(error => {
            res.status(500).json({
                message: "Could not find user, check _ID"
            })
        });
               
    },

    addQuiz : (req , res)=>{
        const userId = req.params.userId;
        
        console.log(userId);

        console.log(req.body.persQuiz);
        
        res.status(200).json({
            message: `update user - ${userId}`
            })     
               
    },

    createQuiz : (req , res)=>{
        const userId = req.params.userId;
            
        User.findById(userId).then((theUser)=>{
            
            if(theUser.persQuiz.length == 0) {

                const PersQuiz = require('../models/persQuiz');
                PersQuiz.find().then((allPersQuiz)=>{
                    
                    const len = allPersQuiz.length;
                    const newArr = [];
                    console.log(len)
                   for (var i = 0; i < len;i++){

                       var newElm = {
                        question: '',
                        relateTo: '',
                        opposite: '',
                        answer: ''
                       }

                       newElm.question = allPersQuiz[i].question;
                       newElm.relateTo = allPersQuiz[i].relateTo;
                       newElm.opposite = allPersQuiz[i].opposite;
                       newArr.push(newElm);
                   } 
                   
                    User.updateOne({_id: userId},{})
                                

                });
            }
            else {
                console.log("no")            
        }
        res.status(200).json({
            message: `nothing`
            })   
        }).catch(error => {
            return res.status(500).json({
                message: "Could not find user, check _ID"
            })
        });       
        
          
               
    },

    deleteUsers: (req , res)=>{
        const userId = req.params.userId;    
        
        User.deleteOne({_id: userId}).then(()=>{
            res.status(200).json({
            message: `delete user - ${userId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

        
    }
}