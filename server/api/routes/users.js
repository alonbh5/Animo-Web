const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const {
    getAllUsers,
    createUsers,
    getUser,
    updateUsers,
    deleteUsers,
    addQuizAns,
    createQuiz,
    persCalc,
    login,
} = require('../controllers/users');


router.get('/' ,getAllUsers);
router.get('/perscalc/:userId' ,persCalc);
router.get('/login' , login);
router.post('/createuser' , createUsers);
router.get('/getuser/:userId' ,getUser);
router.patch('/:userId' , updateUsers);
router.delete('/:userId' , deleteUsers);
router.patch('/addquizans/:userId',addQuizAns);
router.patch('/createquiz/:userId',createQuiz);
router.use(checkAuth);

module.exports  = router;