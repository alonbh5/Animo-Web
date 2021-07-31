const router = require('express').Router();
const {
    getAllRoles,
    getRoleById
} = require('../controllers/roles');


router.get('/', getAllRoles);
router.get('/:roleId', getRoleById);

module.exports = router;