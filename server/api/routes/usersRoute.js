const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const {
    getAllUsers,
    createUsers,
    getUser,
    updateUsers,
    deleteUsers,
    login,
    forgotPassword,
    resetPassword,
} = require('../controllers/usersController');


router.get('/' ,getAllUsers);
router.get('/login' , login);
router.post('/createuser' , createUsers);
router.post('/forgotPassword/:email', forgotPassword)
router.get('/resetPassword', resetPassword)

router.use(checkAuth);
router.get('/getuser/:userId' ,getUser);
router.patch('/:userId' , updateUsers);
router.delete('/:userId' , deleteUsers);

module.exports  = router;