const Roles = require('../schemes/roleSchema');
const mongoose = require('mongoose');

module.exports = {
    getAllRoles:  async (req , res)=>{
        try {
            const allRoles = await Roles.find();
            res.status(200).send(allRoles);
        } catch(err) {
            res.status(500).send(error)
        }
    },
    
    getRoleById: async (req, res) => {
        try {
            const role = await Roles.findOne({role_id: req.params.roleId});
            if(role) {
                res.status(200).send(role);
            } else {
                res.status(404).send({message: `role id ${req.params.roleId} was not found!`});
            }
        } catch (err) {

        }
    }
}