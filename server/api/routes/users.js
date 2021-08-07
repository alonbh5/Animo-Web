const router = require('express').Router();
const {
    getAllUsers,
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers,
    addQuiz,
    createQuiz
} = require('../controllers/users');


router.get('/' ,getAllUsers);
router.post('/createuser' , createUsers);
router.get('/getuser' ,getUsers);
router.patch('/:userId' , updateUsers);
router.delete('/:userId' , deleteUsers);
router.post('/addquiz/:userId',addQuiz);
router.patch('/createquiz/:userId',createQuiz);

module.exports  = router;