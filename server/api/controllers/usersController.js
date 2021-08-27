const User = require('../schemes/userSchema');
const Token = require('../schemes/token');
const PersQuiz = require('../schemes/persQuiz');

const clientURL = 'http://localhost:3001'
const mongoose = require('mongoose');
const { connect } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const HttpError = require('../models/http-error');

const CalculatePersType = (personalQuiz) => {
    let I = 0;
    let E = 0;

    let J = 0;
    let P = 0;

    let N = 0;
    let S = 0;

    let T = 0;
    let F = 0;


    personalQuiz.forEach((item) => {

        let num = parseInt(item.answer);



        if (isNaN(num)) {
            console.log("idiot");
            throw new Error();
        }

        let WhoToLook;

        if (num >= 0) //case postive ==> relateTo
        {
            WhoToLook = item.relateTo;
        }
        else { //case negtive ==> opsite
            num *= -1;
            WhoToLook = item.opposite;
        }

        switch (WhoToLook) {
            case "Thinking":
                T += num;
                break;
            case "Feeling":
                F += num;
                break;
            case "Extraversion":
                E += num;
                break;
            case "Introversion":
                I += num;
                break;
            case "Judging":
                J += num;
                break;
            case "Perceiving":
                P += num;
                break;
            case "Sensing":
                S += num;
                break;
            case "Intuition":
                N += num;
                break;
            default:
                break;
        }


    });


    let persRes = "";

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

    return persRes;
}

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUser = await User.find();
            return res.status(200).json({ message: `Found ${allUser.length} Users`, data: { allUser } })
        } catch (err) {
            return next(new HttpError('An Unknown Error, please try later.', 500));
        }
    },

    createUsers: async (req, res, next) => {
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
            const isExisting = await User.findOne({ email: email.toLowerCase() });
            if (isExisting) {
                return next(new HttpError(`User with email: ${email} already exists`, 400));
            }

            try {
                hashPassword = await bcrypt.hash(password, 12);
            } catch (err) {
                return next(new HttpError('Could not create a user, please try again.', 500));
            }

            const createUser = new User({
                _id: new mongoose.Types.ObjectId(),
                role_id,
                first_name,
                last_name,
                email: email.toLowerCase(),
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
                return next(new HttpError('Could not create a user, please try later.', 500));
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
            return next(new HttpError('Could not create a user, please try later.', 500));
        }
    },

    getUser: async (req, res, next) => {
        const userId = req.params.userId;
        if (userId !== req.userData.userId) {
            return next(new HttpError('You are not allowed to get this user', 401));
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
                return next(new HttpError(`User with id ${userId} was not found!`, 404));
            }
        } catch (error) {
            return next(new HttpError('Something went wrong! please try later', 500));
        }

    },

    forgotPassword: async (req, res, next) => {
        const { email } = req.body;

        try {
            const matchUser = await User.findOne({ email: email });
            if (!matchUser) {
                return next(new HttpError(`User with email ${email} does not exist`, 400));
            }

            let token = await Token.findOne({ userId: matchUser._id });
            if (token) await token.deleteOne();

            let resetToken = crypto.randomBytes(32).toString("hex");
            const hashToken = await bcrypt.hash(resetToken, 12);

            const newResetToken = new Token({
                _id: new mongoose.Types.ObjectId(),
                userId: String(matchUser._id),
                token: hashToken,
                createdAt: Date.now(),
            });
            await newResetToken.save();

            const resetLink = `${clientURL}/resetPassword?token=${resetToken}&userId=${matchUser._id}`;
            res.status(200).send({ message: 'We`ve sent password reset instructions to your mailbox', resetLink: resetLink });
            return;
        } catch (error) {
            return next(new HttpError('Something went wrong! please try later', 500));
        }

    },
    resetPassword: async (req, res, next) => {
        const userId = req.query.userId;
        const token = req.query.token;
        const password = req.query.password;

        let passwordResetToken = await Token.findOne({ userId });
        if (!passwordResetToken) {
            return next(new HttpError("Invalid or expired password reset token", 500));
        }

        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) {
            return next(new HttpError("Invalid or expired password reset token", 500));
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
            return next(new HttpError('Loggin failed, please try later.', 500));
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


    login: async (req, res, next) => {
        const email = req.query.email;
        const password = req.query.password;

        let existingUser;
        try {
            existingUser = await User.findOne({ email: email.toLowerCase() });
        } catch (err) {
            return next(new HttpError('Loggin failed, please try later', 500));
        }

        if (!existingUser) {
            return next(new HttpError('Invalid Email, could not log you in.', 401));
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            return next(new HttpError('Could not log you in, please check your credentials and try again', 401));
        }

        if (!isValidPassword) {
            return next(new HttpError('Invalid Password, could not log you in.', 401));
        }

        let token;
        try {
            token = jwt.sign(
                { userId: existingUser._id, email: existingUser.email, roleId: existingUser.roleId }, 'supersecret', { expiresIn: '1h' }
            )
        } catch (err) {
            return next(new HttpError('Loggin failed, please try later', 500));
        }

        return res.status(200).json({
            message: `Logged in`,
            data: {
                userId: existingUser._id,
                email: existingUser.email,
                token: token
            }
        });
    },

    updateUser: async (req, res, next) => {
        const userId = req.params.userId;

        if (userId !== req.userData.userId) {
            return next(new HttpError('You are not allowed to update this user', 401));
        }

        const { role_id,
            first_name,
            last_name,
            email,
            password,
            age,
            gender
        } = req.body;

        try {
            const matchUser = await User.findById(userId);
            if (matchUser.email !== email) {
                const isExisting = await User.findOne({ email: email });
                if (isExisting) {
                    return next(new HttpError(`User with email: ${email} already exists`, 400));
                }
            }

            await User.updateOne(
                { _id: userId },
                {
                    $set: {
                        first_name: first_name || matchUser.first_name,
                        last_name: last_name || matchUser.last_name,
                        email: email || matchUser.email,
                        age: age || matchUser.age,
                        gender: gender || matchUser.gender,
                        role_id: role_id || matchUser.role_id,
                    }
                },
            );

            if (matchUser.password !== password && password) {
                const hash = await bcrypt.hash(password, 12);
                await User.updateOne(
                    { _id: userId },
                    { $set: { password: hash } },
                );
            }

            let tokenLogin;
            tokenLogin = jwt.sign(
                { userId: userId, email: email, roleId: matchUser.roleId }, 'supersecret', { expiresIn: '1h' }
            )

            res.status(200).send({
                message: `Update User successfuly!`,
                data: {
                    userId: userId,
                    email: email,
                    token: tokenLogin
                }
            });
        } catch {
            return next(new HttpError('Something went wrong! please try later', 500));
        }
    },

    addQuiz: (req, res) => {
        const userId = req.params.userId;

        //console.log(userId);

        //console.log(req.body.persQuiz);

        res.status(200).json({
            message: `update user - ${userId}`
        })

    },

    createQuiz: async (req) => {
        const userId = await req.params.userId;

        try {
            const user = await User.findById(userId);

            if (user.persQuiz.length === 0) {
                const allPersonalQuiz = await PersQuiz.find();
                const len = allPersonalQuiz.length;
                const newArr = [];

                for (var i = 0; i < len; i++) {
                    var newElm = {
                        question_id: '',
                        question: '',
                        relateTo: '',
                        opposite: '',
                        answer: ''
                    }

                    newElm.question_id = allPersonalQuiz[i]._id;
                    newElm.question = allPersonalQuiz[i].question.trim();
                    newElm.relateTo = allPersonalQuiz[i].relateTo.trim();
                    newElm.opposite = allPersonalQuiz[i].opposite.trim();
                    newArr.push(newElm);
                }
                await User.updateOne({ _id: userId }, { persQuiz: newArr })
            }
            return true;
        } catch (err) {
            return false;
        }
    },

    addQuizAns: async (req) => {

        const userId = req.params.userId;

        const AnsweredQuestions = req.body;


        let matchingUser;

        try {
            matchingUser = await User.findOne({ '_id': userId });

            if (!matchingUser) {
                return {
                    res: false,
                    message: "User Was Not Found, Please Try Agian Later.."
                };
            }


            for (let index = 0; index < matchingUser.persQuiz.length; index++) {
                matchingUser.persQuiz[index].answer = AnsweredQuestions[index].answer;
            }

            await matchingUser.markModified('persQuiz');
            await matchingUser.save();
            return {
                res: true,
                message: ""
            };

        } catch (err) {
            return {
                res: false,
                message: "Something Went Wrong, Please Try Agian Later.."
            };
        }


    },

    persCalc: async (req) => {

        const userId = await req.params.userId;
        let matchingUser;
        let persRes;

        try {

            matchingUser = await User.findOne({ '_id': userId });

            if (!matchingUser) {
                return {
                    res: false,
                    message: "User Did Not Found!"
                };
            }

        } catch (err) {
            return {
                res: false,
                message: "Somthing Went Wrong, Please Try Later.."
            };
        }

        try {
            persRes = CalculatePersType(matchingUser.persQuiz);
        } catch (err) {
            return {
                res: false,
                message: "Answer Should Be a Number From [-3,3]"
            };
        }

        matchingUser.personality = persRes;

        try {
            await matchingUser.markModified('personality');
            await matchingUser.save();
            return {
                res: true,
                message: ""
            };
        } catch (err) {
            return {
                res: false,
                message: "Could Not Update User Personality, Please Try Agian Later.."
            };
        }
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