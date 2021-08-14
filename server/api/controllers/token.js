const Token = require('../schemes/token');
const mongoose = require('mongoose');

module.exports = {
    getAllTokens:  (req , res)=>{
        Token.find().then((allTokens)=>{

            res.status(200).json({
                allTokens
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });    

        
    },

    createTokens : (req , res)=>{
        const {userId, token, createdAt } = req.body;        

        const tokenElm = new Token({
            _id: new mongoose.Types.ObjectId(),
            userId,            
            token,
            createdAt
        });

        tokenElm.save().then(()=>{
            res.status(200).json({
            message: `created a new token - ${token}`
             })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });
                
    },

    getToken : (req , res)=>{
        const TokenId = req.params.tokenId;

        Token.findById(TokenId).then((tokenRes)=>{
            res.status(200).json({
                tokenRes
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   
    },

    updateToken : (req , res)=>{
        const TokenId = req.params.tokenId;

        Token.updateOne({_id: TokenId}, req.body).then(()=>{
             res.status(200).json({
            message: `update token - ${TokenId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

       
    },

    deleteToken: (req , res)=>{
        const TokenId = req.params.tokenId;

        
        Token.deleteOne({_id: TokenId}).then(()=>{
            res.status(200).json({
            message: `delete token - ${TokenId}`
            })
        }).catch(error => {
            res.status(500).json({
            error
            })
        });   

        
    }
}