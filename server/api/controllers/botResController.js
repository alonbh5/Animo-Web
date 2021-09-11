const BotRes = require('../schemes/botResSchema');
const mongoose = require('mongoose');
const userController = require('../controllers/usersController');
const User = require('../schemes/userSchema');
const HttpError = require('../models/http-error');
const AnswersFromUsers = require('../schemes/answersSchema');
const BotPresonalQuestions = require('../schemes/presonalQuestionSchema');
const Conversation = require('../schemes/conversationSchema');
const Emotions = require('../schemes/emotionsSchema');
const AnalyzeAnswersSchema = require('../schemes/analyzeAnswersSchema');
const AnalyzeQuestionsSchema = require('../schemes/analyzeSchema');
const emotionData = require ('../schemes/personalEmotionalDataSchema');
const yesWords = ["yes", "yep", "3", "4", "5", "6", "i do"];

var RandomNumber = 0;
var allAnalyzedQuestionArray = AnalyzeQuestionsSchema.find();
var howManyToAsk = 7;


const InitGetToKnow = async (matchUser, textFromUser, res) => {
    //save new log of system user in table DB (object from mongoose is AnswersFromUsers)
    //send a new Answer from bot - start conversion

    let allQuestion = await BotPresonalQuestions.find();

    const ans = new AnswersFromUsers({
        _id: new mongoose.Types.ObjectId(),
        userId: String(matchUser._id),
        questionindex: 0,
        answers: allQuestion
    });

    matchUser.getToKnowState = "In Progress";
    await matchUser.markModified('getToKnowState');
    await matchUser.save();

    ans.save().then(() => {
        res.status(200).json({
            response_type: "GetToKnow-InProgress", //mean for UI to keep sending answer from user from now on
            content: "Lets Get To Know You a bit! Im Going To Ask You A Few Questions :) Ok?",
            response_to: textFromUser
        })
    });
}

const KeepGetToKnow = async (AnswersObjFromUser, matchUser, textFromUser, res) => {

    let currentUserIndex = AnswersObjFromUser.questionindex;
    let questionsArray = AnswersObjFromUser.answers;
    let arrayLength = AnswersObjFromUser.answers.length; //this does not work

    if (currentUserIndex >= arrayLength) {
        if (currentUserIndex = arrayLength) {
            AnswersObjFromUser.answers[currentUserIndex - 1].useranswer = textFromUser; //save answer           
            await AnswersObjFromUser.markModified("answers");
            await AnswersObjFromUser.save();
        }

        matchUser.getToKnowState = "Done"
        await matchUser.markModified('getToKnowState');
        await matchUser.save();
        res.status(200).json({
            response_type: "GetToKnow-Done", //mean for UI to STOP sending answers from user from now on
            content: "Ok! That's All I Wanted To know :)",
            response_to: textFromUser
        });

    }
    else {
        if (currentUserIndex != 0) {
            AnswersObjFromUser.answers[currentUserIndex - 1].useranswer = textFromUser; //save answer           
            await AnswersObjFromUser.markModified("answers");

        }
        let BotText = questionsArray[currentUserIndex].question;

        AnswersObjFromUser.questionindex = parseInt(currentUserIndex) + 1;

        await AnswersObjFromUser.markModified("questionindex");
        await AnswersObjFromUser.save();

        res.status(200).json({
            response_type: "GetToKnow-InProgress", //mean for UI to Keep sending answers from user from now on
            content: BotText,
            response_to: textFromUser
        });
    }


}

const InitAnalyze = async (matchUser, textFromUser, res) => {
    //save new log of system user in table DB (object from mongoose is AnswersFromUsers)
    //send a new Answer from bot - start conversion



    let allEmotions = await AnalyzeQuestionsSchema.find();
    let newArr = allEmotions.map((emo) => {
        return (
            {
                emotionId: String(emo.emotionId),
                score: 0
            }

        );
    });

    var HowManyToRemove = newArr.length - howManyToAsk;

    for (let index = 0; index < HowManyToRemove; index++) {
        let rand = Math.floor(Math.random() * (newArr.length - index));
        newArr.splice(rand, 1);
    }

    const ans = new AnalyzeAnswersSchema({
        _id: new mongoose.Types.ObjectId(),
        userId: String(matchUser._id),
        time: Date.now(),
        answers: newArr,
        currentUserIndex: 0
    });

    matchUser.analyzeState = "In Progress";
    await matchUser.markModified('analyzeState');
    await matchUser.save();

    ans.save().then(() => {
        res.status(200).json({
            response_type: "AnalyzeMyEmotion-InProgress", //mean for UI to keep sending answer from user from now on
            content: "Lets Try To Find Out How Are Feeling! Ok?",
            response_to: textFromUser
        })
    });
}

const KeepAnalyze = async (curAnalzyeAnswersObj, matchUser, textFromUser, res) => {
    {

        let currentUserIndex = curAnalzyeAnswersObj.currentUserIndex;
        let questionsArray = curAnalzyeAnswersObj.answers;
        let arrayLength = curAnalzyeAnswersObj.answers.length;

        if (currentUserIndex >= arrayLength) {
            if (currentUserIndex = arrayLength) {
                if (yesWords.some(word => textFromUser.toLowerCase().includes(word))) {
                    curAnalzyeAnswersObj.answers[currentUserIndex - 1].score++; //TODO           
                    await curAnalzyeAnswersObj.markModified("answers");
                    await curAnalzyeAnswersObj.save();
                }
            }

            
            matchUser.analyzeState = "Done";
            await matchUser.markModified('analyzeState');

            let finalScore = curAnalzyeAnswersObj.answers;            
            var dict = {};

            for (let index = 1; index < finalScore.length; index++) {
                let key = finalScore[index].emotionId;
                if (dict[key])
                    dict[key] = dict[key] + finalScore[index].score; 
                else
                    dict[key] = finalScore[index].score;      
            }

            var maxVal = Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? a : b);           

            matchUser.currentEmotion = maxVal;
            await matchUser.markModified('currentEmotion'); 

            await matchUser.save();

            res.status(200).json({
                response_type: "AnalyzeMyEmotion-Done",
                content: "Ok! I Think I Know What You are Feeling!",
                response_to: textFromUser
            });



        }
        else {
            if (currentUserIndex != 0) {
                if (yesWords.some(word => textFromUser.toLowerCase().includes(word))) {
                    curAnalzyeAnswersObj.answers[currentUserIndex - 1].score++; //TODO          
                    await curAnalzyeAnswersObj.markModified("answers");
                }

            }
            let divRoot = await AnalyzeQuestionsSchema.countDocuments({ emotionId: questionsArray[currentUserIndex].emotionId });

            let BotText = await AnalyzeQuestionsSchema.findOne({ emotionId: questionsArray[currentUserIndex].emotionId }).skip(RandomNumber++ % divRoot);
        

            curAnalzyeAnswersObj.currentUserIndex = parseInt(currentUserIndex) + 1;

            await curAnalzyeAnswersObj.markModified("currentUserIndex");
            await curAnalzyeAnswersObj.save();

            res.status(200).json({
                response_type: "AnalyzeMyEmotion-InProgress", //mean for UI to Keep sending answers from user from now on
                content: BotText.question,
                response_to: textFromUser
            });
        }


    }
}

const InitResult = async (matchUser, textFromUser, res) => {
    {
        let currentEmotion= matchUser.currentEmotion;
        let TheEmotion = await Emotions.findById(currentEmotion);
        let index = 0;
        var botText = `I Think You Are ${TheEmotion.key_name}, Please Choose What Best Describes Your Feeling: (by number)`;
        TheEmotion.name.forEach(element => {
            botText += `\n ${index++} - ${element}`;
        });

        matchUser.emotionState = "In Progress";
        matchUser.markModified('emotionState');
        await matchUser.save();

        res.status(200).json({
            response_type: "AnalyzeMyEmotion-ResultInProgress", //mean for UI to Keep sending answers from user from now on
            content: botText,
            response_to: textFromUser
        });
    }
}

const KeepResult  = async ( matchUser, textFromUser, res) => {

    let currentEmotion= matchUser.currentEmotion;
    let TheEmotion = await Emotions.findById(currentEmotion);
    let choice = TheEmotion.name[parseInt(textFromUser)];
    choice = choice.toLowerCase();
    

    let botText = await emotionData.findOne({emotion : choice, personality: matchUser.personality});
    

    res.status(200).json({
        response_type: "AnalyzeMyEmotion-ResultDone", //mean for UI to Keep sending answers from user from now on
        content: botText.data,
        response_to: textFromUser
    });

    matchUser.emotionState = "Done";
    matchUser.markModified('emotionState');
    await matchUser.save();
}

//--------------------------------------------------------------------------

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

        let result = await userController.addQuizAns(req);
        if (!result.res) {
            return next(new HttpError(result.message, 500));
        }
        result = await userController.persCalc(req);
        if (!result.res) {
            return next(new HttpError(result.message, 500));
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
    },

    talkToBot: async (req, res) => {

        const {
            userId,
            textFromUser,
            talkType
        } = req.body;

        let matchUser;

        try {
            matchUser = await User.findById(userId);
        } catch (err) {
            res.status(404).json({ message: "Could Not Find User" })
        }


        if (matchUser) {
            switch (talkType) {
                case "GetToKnow": //if you want to get to know you                    

                    switch (matchUser.getToKnowState) {
                        case "uninitialized": // start a new session with him

                            InitGetToKnow(matchUser, textFromUser, res);

                            break;
                        case "In Progress": // contine asking him questions

                            try {
                                let ansObj = await AnswersFromUsers.findOne({ userId: matchUser._id });
                                KeepGetToKnow(ansObj, matchUser, textFromUser, res);
                            } catch (err) {
                                res.status(404).json({ message: "Could Not Find Answers From This User - try again" })
                            }

                            break;
                        case "Done":
                            res.status(200).json({
                                massage: `You already Know The User ${matchUser.first_name}`
                            })
                            break;
                        default:
                    }

                    break;
                case "Advice":
                    let cleanText = textFromUser.replace(/[?!.,*()\\#$%^&]/g, '').trim().toLowerCase().replace(/\s\s+/g, ' ');
                    var divRoot = await Conversation.countDocuments({ keyWords: cleanText });
                    let answer = await Conversation.findOne({ keyWords: cleanText }).skip(RandomNumber++ % divRoot);
                    let state = "Advice-Done";

                    if (answer) {
                        if (answer.isPersonal) {
                            let allAnswers = await AnswersFromUsers.findOne({ userId: matchUser._id });
                            let HowManyToFill = answer.indexInQuestion.length;

                            for (let index = 0; index < HowManyToFill; index++) {
                                let nextToReplace = "{" + String(index) + "}";
                                let replacement = allAnswers.answers[answer.indexInQuestion[index]].useranswer;
                                replacement = replacement.toLowerCase()
                                    .split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ');
                                answer.question = answer.question.replace(nextToReplace, replacement);
                            }
                        }

                        if (!answer.done)
                            state = "Advice";

                        res.status(200).json({
                            response_type: state,
                            content: answer.question,
                            response_to: textFromUser
                        });

                    }
                    else {
                        res.status(200).json({
                            response_type: "Advice",
                            content: "Im Sorry, My Bot Brain Cant Handel Your Question! Can you Rephrase It? (I am Still on Beta 😢)",
                            response_to: textFromUser
                        });
                    }

                    break;
                case "AnalyzeMyEmotion":


                    switch (matchUser.analyzeState) {
                        case "uninitialized": // start a new session with him

                            InitAnalyze(matchUser, textFromUser, res);

                            break;
                        case "In Progress": // continue asking him questions

                            try {
                                let ansObj = await AnalyzeAnswersSchema.find({ userId: matchUser._id }).sort({ time: -1 }).limit(1);
                                KeepAnalyze(ansObj[0], matchUser, textFromUser, res);
                            } catch (err) {
                                res.status(404).json({ message: "Could Not Find Answers From This User - try again" })
                            }

                            break;
                        case "Done":
                            InitAnalyze(matchUser, textFromUser, res);
                            break;
                        default:
                    }

                    break;
                case "AnalyzeMyEmotion-Result":

                    switch (matchUser.emotionState) {
                        case "uninitialized": // start a new session with him

                            InitResult(matchUser, textFromUser, res);

                            break;
                        case "In Progress": // continue asking him questions

                        KeepResult(matchUser, textFromUser, res);

                            break;
                        case "Done":
                            InitResult(matchUser, textFromUser, res);
                            break;
                        default:
                    }

                    break;

                    res.status(200).json({
                        response_type: "GiveMeAnswer", //mean for UI to keep sending answer from user from now on
                        content: "You Are Idiot!",
                        response_to: textFromUser
                    })

                    break;
                default:
                    res.status(405).json({
                        massage: "Bad talkType"
                    })
            }
        }
        else {
            res.status(404).json({
                massage: "User is not in DB"
            });
        }


    }
}