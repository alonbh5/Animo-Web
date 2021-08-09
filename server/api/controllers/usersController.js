const User = require('../models/userSchema');
const Token = require('../models/token');
const clientURL = 'http://localhost:3001'
const mongoose = require('mongoose');
const { connect } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

module.exports = {
    getAllUsers: (req, res) => {
        User.find().then((allUsers) => {

            res.status(200).json({
                allUsers
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });


    },

    createUsers: async (req, res) => {
        const { role_id,
            first_name,
            last_name,
            email,
            password,
            age,
            gender,
        } = req.body;

        let hashPassword;
        try {
            const isExisting = await User.findOne({ email: email });
            if (isExisting) {
                res.status(400).send({ message: `User with email: ${email} already exists` })
                return;
            }

            try {
                hashPassword = await bcrypt.hash(password, 12);
            } catch (err) {
                res.status(500).send({ message: 'Could not create a user, please try again.' })
                return;
            }

            const createUser = new User({
                _id: new mongoose.Types.ObjectId(),
                role_id,
                first_name,
                last_name,
                email,
                password: hashPassword,
                age,
                gender,
            });


            await createUser.save();
            let token;
            try {
                token = jwt.sign(
                    { userId: createUser._id, email: createUser.email, roleId: createUser.roleId }, 'supersecret', { expiresIn: '1h' }
                )
            } catch (err) {
                res.status(500).send('Signing Up failed, please try later.');
            }


            res.status(201).send({
                message: `Created a new user successfuly!`,
                data: {
                    userId: createUser._id,
                    email: createUser.email,
                    token: token
                }
            });
        } catch (error) {
            res.status(500).send({ error: 'Could not create a user, please try again.' });
        }
    },

    getUser: async (req, res) => {
        const userId = req.params.userId;
        if (userId !== req.userData.userId) {
            res.status(401).send({ message: 'You are not allowed to get this user' })
        }

        try {
            const matchUser = await User.findById(userId);
            if (matchUser) {
                res.status(200).send({
                    message: `find user by id ${userId}`,
                    data: matchUser
                })
            }
            else {
                res.status(404).send({
                    message: `user with id ${userId} was not found!`
                })
            }
        } catch (error) {
            res.status(500).send({ message: 'Something went wrong! please try later' });
        }

    },

    forgotPassword: async (req, res) => {
        const {email } = req.body;

        try {
            const matchUser = await User.findOne({ email: email });
            if (!matchUser) {
                res.status(400).send({ message: `User with email ${email} does not exist` })
            }

            let token = await Token.findOne({ userId: matchUser._id });
            if (token) await token.deleteOne();

            let resetToken = crypto.randomBytes(32).toString("hex");
            const hashToken = await bcrypt.hash(resetToken,12);

            const newResetToken = new Token({
                _id: new mongoose.Types.ObjectId(),
                userId: String(matchUser._id),
                token: hashToken,
                createdAt: Date.now(),
            });
            await newResetToken.save();

            const resetLink = `${clientURL}/resetPassword?token=${resetToken}&userId=${matchUser._id}`;
            res.status(200).send({ message: 'We`ve sent password reset instructions to your mailbox', resetLink: resetLink  });
            return;
        } catch (error) {
            res.status(500).send({ message: 'Something went wrong! please try later' });
        }

    },
    resetPassword: async (req, res) => {
        const userId = req.query.userId;
        const token = req.query.token;
        const password = req.query.password;

        let passwordResetToken = await Token.findOne({ userId });

        if (!passwordResetToken) {
            res.status(400).send({ message: "Invalid or expired password reset token" });
        }

        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) {
            res.status(500).send({ message: "Invalid or expired password reset token"});
        }

        const hash = await bcrypt.hash(password, 12);
        await User.updateOne(
            { _id: userId },
            { $set: { password: hash } },
        );

        const existingUser = await User.findById({ _id: userId });

        let tokenLogin;
        try {
            tokenLogin = jwt.sign(
                { userId: existingUser._id, email: existingUser.email, roleId: existingUser.roleId }, 'supersecret', { expiresIn: '1h' }
            )
        } catch (err) {
            res.status(500).send('Loggin failed, please try later.');
        }

        await passwordResetToken.deleteOne();

        res.status(200).send({
            message: `Password Reset Successfully`,
            data: {
                userId: existingUser._id,
                email: existingUser.email,
                token: tokenLogin
            }
        });
    },


    login: async (req, res) => {
        const email = req.query.email;
        const password = req.query.password;

        let existingUser;
        try {
            existingUser = await User.findOne({ email: email });
        } catch (err) {
            res.status(401).send({ message: 'Loggin failed, please try later' })
            // const error = new HttpError('Loggin failed, please try later', 500);
            // return next(error)
        }

        if (!existingUser) {
            res.status(401).send({ message: 'Invalid credentials, could not log you in.' })
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            res.status(500).send({ message: 'Could not log you in, please check your credentials and try again' })
        }

        if (!isValidPassword) {
            res.status(401).send({ message: 'Invalid credentials, could not log you in.' })
        }

        let token;
        try {
            token = jwt.sign(
                { userId: existingUser._id, email: existingUser.email, roleId: existingUser.roleId }, 'supersecret', { expiresIn: '1h' }
            )
        } catch (err) {
            res.status(500).send('Loggin failed, please try later.');
        }

        res.status(200).send({
            message: `Logged in`,
            data: {
                userId: existingUser._id,
                email: existingUser.email,
                token: token
            }
        });
    },

    updateUsers: (req, res) => {
        const userId = req.params.userId;
        


        User.findById(userId).then((theUser) => {
            if (!theUser) {
                return res.status(404).json({
                    message: "User Was not Found, check _ID"
                })
            }
            else {
                User.updateOne({ _id: userId }, req.body).then(() => {
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

    addQuizAns : (req , res)=>{
        
        const userId = req.params.userId;

        const questionID = req.query.question;
        var answer = req.query.answer;       
        

        User.findOne({ '_id': userId}, {}, {sort: { date: -1 }}, function(err, record){
            if (err) {
               //don't just ignore this, log or bubble forward via callbacks
               return;
            }
            if (!record) {
                //Record not found, log or send 404 or whatever
                return;
            }
            

            record.persQuiz.forEach(function (item) {                  
                
                if (item.question_id == questionID) 
                    item.answer = answer ;                    
                
            });
            //Now, mongoose can't automatically detect that you've changed the contents of 
            //record.array, so tell it
            //see http://mongoosejs.com/docs/api.html#document_Document-markModified
            record.markModified('persQuiz');
            record.save().then(()=>{
                res.status(200).json({
                    message: `Added new Answer to User`
                    })
                }).catch((err)=>{
                        return res.status(401).json({
                            message: error
                        })
                    });         
         });
    },

    createQuiz : (req , res)=>{
        const userId = req.params.userId;
            
        User.findById(userId).then((theUser)=>{
            
                        
            if(theUser.persQuiz.length == 0) {

                const PersQuiz = require('../models/persQuiz');
                PersQuiz.find().then((allPersQuiz) => {

                    const len = allPersQuiz.length;
                    const newArr = [];
                    console.log(len)
                   for (var i = 0; i < len;i++){

                       var newElm = {
                        question_id:'',   
                        question: '',
                        relateTo: '',
                        opposite: '',
                        answer: ''
                       }

                       newElm.question_id = allPersQuiz[i]._id;
                       newElm.question = allPersQuiz[i].question.trim();
                       newElm.relateTo = allPersQuiz[i].relateTo.trim();
                       newElm.opposite = allPersQuiz[i].opposite.trim();
                       newArr.push(newElm);
                   }                    
                   
                   //console.log(newArr);

                    User.updateOne({_id: userId},{persQuiz: newArr}).then(()=>{
                        res.status(200).json({
                            message: `Added new Quiz to User`
                            }).catch((err)=>{
                                res.status(401).json({
                                    message: error
                                })
                            });   
                    })
                                

                });
            }
            else {
                res.status(208).json({
                    message: `User already has Quiz`
                    })              
        }
        
        }).catch(error => {
            return res.status(500).json({
                message: "Could not find user, check _ID"
            })
        });       
        
          
               
    }, 
    
    persCalc : (req , res)=>{
        
        const userId = req.params.userId;              

        User.findOne({ '_id': userId}, {}, {sort: { date: -1 }}, function(err, record){
            if (err) {
               //don't just ignore this, log or bubble forward via callbacks
               return;
            }
            if (!record) {
                //Record not found, log or send 404 or whatever
                return;
            }

            var I = 0;
            var E = 0;
            
            var J = 0;
            var P = 0; 

            var N = 0;
            var S = 0;

            var T = 0;
            var F = 0;

            

            record.persQuiz.forEach(function (item) {  
                
                switch (item.relateTo) {
                    case "Thinking":
                        T += parseInt(item.answer);
                        break;
                    case "Feeling":
                        F += parseInt(item.answer);
                        break;
                    case "Extraversion":
                        E += parseInt(item.answer);
                        break;
                    case "Introversion":
                        I += parseInt(item.answer);
                        break;                        
                    case "Judging":
                        J += parseInt(item.answer);
                        break;
                    case "Perceiving":
                        P += parseInt(item.answer);
                        break;
                    case "Sensing":
                        S += parseInt(item.answer);
                        break;
                    case "Intuition":
                        N += parseInt(item.answer);
                        break;  
                    default:
                        break;
                }                 
                
            });

            var persRes = "";

            if (I > E)
                persRes = "I";
            else
                persRes = "E";

            if (N > S)
                persRes += "N";
            else
                persRes += "S";

            if (F > T)
                persRes += "F";
            else
                persRes += "T";

            if (J > P)
                persRes += "J";
             else
                persRes += "P";
            
            //console.log(persRes);
            record.personality = persRes;
            record.markModified('personality');
            record.save().then(()=>{
                res.status(200).json({
                    message: `Added new personlity to User - ${persRes}`
                    })
                }).catch((err)=>{
                        return res.status(401).json({
                            message: error
                        })
                    });   
         });
    },

    deleteUsers: (req, res) => {
        const userId = req.params.userId;

        User.deleteOne({ _id: userId }).then(() => {
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