const BotRes = require('../schemes/botResSchema');
const mongoose = require('mongoose');
const userController = require('../controllers/usersController');
const User = require('../schemes/userSchema');
const HttpError = require('../models/http-error');
const AnswersFromUsers = require('../schemes/answersSchema');
const BotPresonalQuestions = require('../schemes/presonalQuestionSchema');
const Conversation = require('../schemes/conversationSchema');
const Emotions = require('../schemes/emotionsSchema');
const AnalyzeAnswersSchema = require ('../schemes/analyzeAnswersSchema');
const AnalyzeQuestionsSchema = require ('../schemes/analyzeSchema');
const yesWords = ["yes","yep","Yes"];

var RandomNumber = 0;
var allAnalyzedQuestionArray = AnalyzeQuestionsSchema.find();


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
        return(
            {
                questionId: String(emo.emotionId),
                score: 0
            }
      
        );
    });

    var HowManyToRemove = newArr.length - 5;

    for (let index = 0; index < HowManyToRemove; index++) {
        let rand = Math.floor(Math.random() * (newArr.length - index));
        newArr.splice(rand,1);        
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
                if (yesWords.some(word => textFromUser.includes(word))) {
                    curAnalzyeAnswersObj.answers[currentUserIndex - 1].score++; //TODO this is not good..           
                await curAnalzyeAnswersObj.markModified("answers");
                await curAnalzyeAnswersObj.save();
                }
            }
    
            matchUser.analyzeState = "Done"
            await matchUser.markModified('analyzeState');
            await matchUser.save();
            res.status(200).json({
                response_type: "AnalyzeMyEmotion-Done", //mean for UI to STOP sending answers from user from now on
                content: "Ok! I Think I Know What You are Feeling!",
                response_to: textFromUser
            });
    
        }
        else {
            if (currentUserIndex != 0) {
                if (yesWords.some(word => textFromUser.includes(word))) {
                    curAnalzyeAnswersObj.answers[currentUserIndex - 1].score++; //TODO this is not good..          
                    await curAnalzyeAnswersObj.markModified("answers");
                }
    
            }            
            let divRoot = await AnalyzeQuestionsSchema.countDocuments({ emotionId: questionsArray[currentUserIndex].questionId });

            console.log(divRoot);
            let BotText = await AnalyzeQuestionsSchema.findOne({ emotionId: questionsArray[currentUserIndex].questionId  }).skip(RandomNumber++ % divRoot);
            console.log(BotText);
            console.log( BotText.question);

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
                                answer.question = answer.question.replace(nextToReplace,replacement);
                            }                            
                        }

                        let curEmotion = await Emotion.findById(answer.emotionId);

                        if (curEmotion) {
                            
                            matchUser.currentEmotion = "answer.emotionId";
                            await matchUser.markModified('currentEmotion');
                            await matchUser.save();
                        }

                        if (!answer.done)
                            state = "Advice"; //keep sending here we are not done

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
                                let ansObj = await AnalyzeAnswersSchema.find({ userId: matchUser._id }).sort({time: -1}).limit(1);
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