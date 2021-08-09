const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const {
    getAllUsers,
    createUsers,
    getUser,
    updateUsers,
    deleteUsers,
    addQuiz,
    createQuiz,
    login,
    forgotPassword,
    resetPassword,
} = require('../controllers/usersController');


router.get('/' ,getAllUsers);
router.get('/login' , login);
router.patch('/resetPassword', resetPassword)
router.post('/forgotPassword', forgotPassword)
router.post('/createuser' , createUsers);

router.use(checkAuth);
router.get('/getuser/:userId' ,getUser);
router.patch('/:userId' , updateUsers);
router.delete('/:userId' , deleteUsers);
router.post('/addquiz/:userId',addQuiz);
router.patch('/createquiz/:userId',createQuiz);

module.exports  = router;