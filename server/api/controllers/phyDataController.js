const PhyData = require('../schemes/phyDataSchema');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');

module.exports = {
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
            const allTips = await PhyData.find({ data_type: "Tips" })
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


    getArticals: async (req, res, next) => {
        try {
            const allArticals = await PhyData.find({ data_type: "Article1" })
            if (allArticals.length === 0) {
                return next(new HttpError( `Found no Articals`, 204));
            }
            const length = allArticals.length;
            res.status(200).send({
                message: `We Found ${length} tips`,
                data: allArticals
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
            created_by } = req.body;

        const confirm = false;

        const phyData = new PhyData({
            _id: new mongoose.Types.ObjectId(),
            data_type,
            link,
            author,
            title,
            emotions,
            created_by,
            confirm
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