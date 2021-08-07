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
} = require('../controllers/users');


router.get('/' ,getAllUsers);
router.get('/login' , login);
router.post('/createuser' , createUsers);
router.use(checkAuth);
router.get('/getuser/:userId' ,getUser);
router.patch('/:userId' , updateUsers);
router.delete('/:userId' , deleteUsers);
router.post('/addquiz/:userId',addQuiz);
router.patch('/createquiz/:userId',createQuiz);

module.exports  = router;