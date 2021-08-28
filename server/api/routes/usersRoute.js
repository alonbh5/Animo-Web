const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const {
    getAllUsers,
    createUsers,
    getUser,
    updateUser,
    deleteUser,
    addQuiz,
    createQuiz,
    login,
    updateStatus,
    forgotPassword,
    resetPassword,
} = require('../controllers/usersController');


router.get('/' ,getAllUsers);
router.get('/login' , login);
router.patch('/resetPassword', resetPassword)
router.post('/forgotPassword', forgotPassword)
router.post('/createuser' , createUsers);
router.post('/addquiz/:userId',addQuiz);
router.patch('/createquiz/:userId',createQuiz);

router.use(checkAuth);
router.get('/getuser/:userId' ,getUser);
router.patch('/updateUser/:userId' , updateUser);
router.patch('/updateStatus/:userId' , updateStatus);
router.delete('/deleteUser/:userId' , deleteUser);

module.exports  = router;