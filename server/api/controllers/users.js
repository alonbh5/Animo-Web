const User = require('../models/users');
const mongoose = require('mongoose');

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
             permissions_to_app
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
             permissions_to_app
        });

        user.save().then(()=>{
            res.status(200).json({
            message: `created a new User - ${_id}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });
                
    },

    getUsers : (req , res)=>{
        const userId = req.params.userId;

        User.findById(userId).then((UsersRes)=>{
            res.status(200).json({
                UsersRes
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },

    updateUsers : (req , res)=>{
        const userId = req.params.userId;

        User.updateOne({_id: userId}, req.body).then(()=>{
             res.status(200).json({
            message: `update user - ${userId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
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