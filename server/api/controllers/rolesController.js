const Roles = require('../schemes/roleSchema');
const mongoose = require('mongoose');

module.exports = {
    getAllRoles:  async (req , res)=>{
        try {
            const allRoles = await Roles.find();
           return  res.status(200).json({message: `Found ${allRoles.length} Roles`, data: {allRoles},});
        } catch(err) {
            return next(new HttpError(`Could not fetch roles`, 500));
        }
    },
    
    getRoleById: async (req, res) => {
        const roleid=req.params.roleId;
        try {
            const role = await Roles.findOne({role_id: req.params.roleId});
            if(role) {
                return res.status(200).json({
                    message: `find role id ${roleid}`,
                    data: {role},
                    });
            } else {
                return next(new HttpError(`role id ${req.params.roleId} was not found!`, 500));
            }
        } catch (err) {
        }
    }
}