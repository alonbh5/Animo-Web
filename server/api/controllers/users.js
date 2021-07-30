const User = require('../models/users');
const mongoose = require('mongoose');
const { connect } = require('mongodb');

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
        try {
            const isExisting = await User.findOne({ email: email });
            if (isExisting) {
                res.status(400).send({ error: `User with email: ${email} already exists` })
            }
            await user.save();
            res.status(200).send({
                message: `created a new User - email is ${email} `
            });
        } catch (error) {
            res.status(500).send({ error });
        }
    },

    getUsers: async (req, res) => {
        const email = req.query.email;
        const password = req.query.password;

        try {
            const matchUser = await User.findOne({ password: password, email: email });
            if (matchUser) {
                res.status(200).send(matchUser)
            }
            else {
                res.status(404).send({
                    error: `user with email ${email} password: ${password} was not found!`
                })
            }
        } catch (error) {
            res.status(500).json({ error })
        }

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