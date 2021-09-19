const router = require('express').Router();
const {
    getAllRoles,
    getRoleById
} = require('../controllers/rolesController');

router.get('/', getAllRoles);
router.get('/:roleId', getRoleById);

module.exports = router;