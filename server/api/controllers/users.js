const User = require('../models/users');
const mongoose = require('mongoose');
const { connect } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            }

            try {
                hashPassword = await bcrypt.hash(password, 12);
            } catch (err) {
                res.status(500).send({ message: 'Could not create a user, please try again.' })
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
        if(userId !== req.userData.userId) {
            res.status(401).send({message: 'You are not allowed to get this user'})
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
        console.log('MyPassword:' + password);

        console.log(existingUser);

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

        User.updateOne({ _id: userId }, req.body).then(() => {
            res.status(200).json({
                message: `update user - ${userId}`
            })
        }).catch(error => {
            res.status(500).json({
                error
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