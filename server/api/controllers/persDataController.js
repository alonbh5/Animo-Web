const PersData = require('../schemes/persDataSchema');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error')

module.exports = {
    getAllPersData: (req, res) => {
        PersData.find().then((allPersData) => {

            res.status(200).json({
                allPersData
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });


    },

    createPersData: (req, res) => {
        const { type, descritpion, properites, link, alias } = req.body;

        const persData = new PersData({
            _id: new mongoose.Types.ObjectId(),
            type,
            descritpion,
            properites,
            link,
            alias
        });

        persData.save().then(() => {
            res.status(200).json({
                message: `created a new data - ${type} - AKA ${alias}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });

    },

    getPersData: (req, res) => {
        const persDataId = req.params.persDataId;

        console.log("im here by id ");
        console.log(persDataId);

        PersData.findById(persDataId).then((persRes) => {
            res.status(200).json({
                persRes
            })
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                massage: "WTF"
            })
        });
    },

    updatePersData: (req, res) => {
        const persDataId = req.paramspersDataId;

        PersData.updateOne({ _id: persDataId }, req.body).then(() => {
            res.status(200).json({
                message: `update qustion - ${persDataId}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });


    },

    deletePersData: (req, res) => {
        const persDataId = req.params.persDataId;

        PersData.deleteOne({ _id: persDataId }).then(() => {
            res.status(200).json({
                message: `delete text - ${persDataId}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });


    },

    getPersByName: async (req, res, next) => {
        const persDataName = req.params.persDataName;

        try {
            const persData = await PersData.findOne({ type: persDataName });

            if (persData) {
                return res.status(200).json({
                    message: 'We Found Pesonality',
                    data: persData
                })
            } else {
                return next(new HttpError("Please provide a valid personality type", 401));
            }
        } catch (err) {
            return next(new HttpError('An Unknown Error, please try later.', 500));
        }
    },
}