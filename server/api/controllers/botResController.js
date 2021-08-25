const BotRes = require('../schemes/botResSchema');
const mongoose = require('mongoose');
const userController = require('../controllers/usersController');
const User = require('../schemes/userSchema');
const HttpError = require('../models/http-error')

module.exports = {
    getAllBotRes: (req, res) => {
        BotRes.find().then((allBotRes) => {

            res.status(200).json({
                allBotRes
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });


    },

    createBotRes: (req, res) => {
        const { response_type, content, response_to } = req.body;

        const botRes = new BotRes({
            _id: new mongoose.Types.ObjectId(),
            response_type,
            content,
            response_to
        });

        botRes.save().then(() => {
            res.status(200).json({
                message: `created a new Bot Res - ${content}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });

    },

    getBotRes: (req, res) => {
        const botResId = req.params.botResId;

        BotRes.findById(botResId).then((BotResRes) => {
            res.status(200).json({
                BotResRes
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },

    updateBotRes: (req, res) => {
        const botResId = req.params.botResId;

        BotRes.updateOne({ _id: botResId }, req.body).then(() => {
            res.status(200).json({
                message: `update bot res - ${botResId}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });


    },

    deleteBotRes: (req, res) => {
        const botResId = req.params.botResId;

        BotRes.deleteOne({ _id: botResId }).then(() => {
            res.status(200).json({
                message: `delete text - ${botResId}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },

    StartPersQuiz: async (req, res) => {
        const userId = req.params.userId;
        let result = await userController.createQuiz(req);

        if (result) {
            await User.findOne({ '_id': userId }, {}, { sort: { date: -1 } }, async function (err, record) {

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
        else {
            res.status(500).json({
                massage: "User was not found"
            })
        }
    },

    AnswerPersQuiz: async (req, res, next) => {
        /*
        this if after you used StartPersQuiz
        Gets: Relevent UserID, QuestionID for question x and an Answer for x
        return:bot res with
            if not all done : content is next qurstion, response_type of "Pers Question"
            if all is done : content is personlity Type, response_type of "Pers-Res"
        */

        const userId = req.params.userId;
        console.log("QUESTIONS");

        console.log(req.body);

        let ans = await userController.addQuizAns(req);
        if (!ans) {
            return next(new HttpError("Somthing went worng, are you sure answers is in range [-1,3]?", 504));
        }
        ans = await userController.persCalc(req);
        if (!ans) {
            return next(new HttpError("Somthing went worng, are you sure answers is in range [-1,3]?", 504));
        }

        try {
            const userMatch = await User.findOne({ '_id': userId });
            res.status(200).json({
                message: "user has new personality",
                data: userMatch.personality,
            });

        } catch (err) {
            return next(new HttpError('Unknown Error, please try later.', 404));
        }
    }
}