const User = require('../schemes/userSchema');
const Token = require('../schemes/token');
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
        const { email } = req.body;

        try {
            const matchUser = await User.findOne({ email: email });
            if (!matchUser) {
                res.status(400).send({ message: `User with email ${email} does not exist` })
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
            res.status(500).send({ message: "Invalid or expired password reset token" });
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
            res.status(500).send({ message: 'Loggin failed, please try later' });
            // const error = new HttpError('Loggin failed, please try later', 500);
            // return next(error)
        }

        if (!existingUser) {
            res.status(401).send({ message: 'Invalid Email, could not log you in.' });
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            res.status(500).send({ message: 'Could not log you in, please check your credentials and try again' })
        }

        if (!isValidPassword) {
            res.status(401).send({ message: 'Invalid Password, could not log you in.' })
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

    updateUser: async (req, res) => {
        const userId = req.params.userId;

        if (userId !== req.userData.userId) {
            res.status(401).send({ message: 'You are not allowed to update this user' })
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
                    res.status(400).send({ message: `User with email: ${email} already exists` })
                    return;
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
            res.status(500).send({ message: 'Something went wrong! please try later' });
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