const router = require('express').Router();
const {
    getAllUsers,
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers
} = require('../controllers/users');


router.get('/' ,getAllUsers);
router.post('/' , createUsers);
router.get('/:email/:password' ,getUsers);
router.patch('/:userId' , updateUsers);
router.delete('/:userId' , deleteUsers);

module.exports  = router;