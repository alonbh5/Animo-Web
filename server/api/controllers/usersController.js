const User = require('../schemes/userSchema');
const Token = require('../schemes/token');
const clientURL = 'http://localhost:3001'
const mongoose = require('mongoose');
const { connect } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const HttpError = require('../models/http-error')
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

        console.log(userId);

        console.log(req.body.persQuiz);

        res.status(200).json({
            message: `update user - ${userId}`
        })

    },

    createQuiz: (req, res) => {


        User.findById(userId).then((theUser) => {

            if (theUser.persQuiz.length == 0) {

                const PersQuiz = require('../schemes/persQuiz');
                PersQuiz.find().then((allPersQuiz) => {

                    const len = allPersQuiz.length;
                    const newArr = [];
                    console.log(len)
                    for (var i = 0; i < len; i++) {

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

                    User.updateOne({ _id: userId }, {})


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