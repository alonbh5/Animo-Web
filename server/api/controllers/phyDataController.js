const PhyData = require('../models/phyDataSchema');
const mongoose = require('mongoose');

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

    getTips: async (req, res) => {
        try {
            const allTips = await PhyData.find({ data_type: "Tips" })
            if (allTips.length === 0) {
                res.status(204).send({ message: `Found no Tips` });
            }
            const length = allTips.length;
            res.status(200).send({
                message: `We Found ${length} tips`,
                data: allTips
            });
        } catch (err) {
            res.status(500).send('Unknown Error, please try later.');
        }
    },


    getArticals: async (req, res) => {
        try {
            const allArticals = await PhyData.find({ data_type: "Article1" })
            if (allArticals.length === 0) {
                res.status(204).send({ message: `Found no Articals` });
            }
            const length = allArticals.length;
            res.status(200).send({
                message: `We Found ${length} tips`,
                data: allArticals
            });
        } catch (err) {
            res.status(500).send('Unknown Error, please try later.');
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