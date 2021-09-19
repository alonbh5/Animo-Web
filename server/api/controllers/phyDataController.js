const PhyData = require('../schemes/phyDataSchema');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');

module.exports = {    
    confirmData: async (req, res, next) => {
        const dataId = req.params.dataId;
        try {
            const matchData = await PhyData.findById(dataId);
            if (!matchData) {
                return next(new HttpError(`User by id ${dataId} did not found`, 404));
            }

            await PhyData.updateOne(
                { _id: dataId },
                { $set: { confirm: true } },
            );

            res.status(200).send({
                message: `Confirm User successfuly!`,
                data: {
                    dataId: dataId,
                }
            });
        } catch {
            return next(new HttpError('Something went wrong! please try later', 500));
        }
    },

    getAllTexts: async (req, res) => {
        PhyData.find().then((allTextsRes) => {
            res.status(200).json({
                allTextsRes
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },

    getTips: async (req, res, next) => {
        try {
            const allTips = await PhyData.find({ data_type: "Tip" })
            if (allTips.length === 0) {
                return next(new HttpError( `Found no Tips`, 204));
            }
            const length = allTips.length;
            res.status(200).send({
                message: `We Found ${length} tips`,
                data: allTips
            });
        } catch (err) {
            return next(new HttpError( 'Unknown Error, please try later.', 500));
        }
    },

    getArticles: async (req, res, next) => {
        try {
            const allArticles = await PhyData.find({ data_type: "Article" })
            if (allArticles.length === 0) {
                return next(new HttpError( `Found no Articles`, 204));
            }
            const length = allArticles.length;
            res.status(200).send({
                message: `We Found ${length} Articles`,
                data: allArticles
            });
        } catch (err) {
            return next(new HttpError( 'Unknown Error, please try later.', 500));
        }
    },

    createText: (req, res) => {
        const {
            data_type,
            link,
            author,
            title,
            emotions,
            content,
            img } = req.body;
        const confirm = false;

        const phyData = new PhyData({
            _id: new mongoose.Types.ObjectId(),
            data_type,
            link,
            author,
            title,
            emotions,
            content,
            confirm,
            img
        });

        phyData.save().then(() => {
            res.status(200).json({
                message: `created a new text - ${title}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });

    },

    getText: (req, res) => {
        const textId = req.params.textId;

        PhyData.findById(textId).then((TextRes) => {
            res.status(200).json({
                TextRes
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },

    updateText: (req, res) => {
        const textId = req.params.textId;

        PhyData.updateOne({ _id: textId }, req.body).then(() => {
            res.status(200).json({
                message: `update text - ${textId}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },

    deleteText: (req, res) => {
        const textId = req.params.textId;

        PhyData.deleteOne({ _id: textId }).then(() => {
            res.status(200).json({
                message: `delete text - ${textId}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    }
}