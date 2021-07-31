const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const {
    getAllUsers,
    createUsers,
    getUser,
    updateUsers,
    deleteUsers,
    login,
} = require('../controllers/users');


router.get('/' ,getAllUsers);
router.get('/login' , login);
router.post('/createuser' , createUsers);

router.use(checkAuth);
router.get('/getuser/:userId' ,getUser);
router.patch('/:userId' , updateUsers);
router.delete('/:userId' , deleteUsers);

module.exports  = router;