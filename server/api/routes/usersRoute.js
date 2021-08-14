const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const {
    getAllUsers,
    createUsers,
    getUser,
    updateUser,
    deleteUsers,
    addQuizAns,
    createQuiz,
    persCalc,
    login,
    forgotPassword,
    resetPassword,
} = require('../controllers/usersController');


router.get('/' ,getAllUsers);
router.get('/perscalc/:userId' ,persCalc);
router.get('/login' , login);
router.patch('/resetPassword', resetPassword)
router.post('/forgotPassword', forgotPassword)
router.post('/createuser' , createUsers);
router.use(checkAuth);

router.get('/getuser/:userId' ,getUser);
router.patch('/updateUser/:userId' , updateUser);
router.delete('/:userId' , deleteUsers);

module.exports  = router;