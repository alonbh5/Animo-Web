const router = require('express').Router();
const {
    getAllPersQuiz,
    createPersQuiz,
    getPersQuiz,
    updatePersQuiz,
    deletePersQuiz
} = require('../controllers/persQuiz');

router.get('/' ,getAllPersQuiz);
router.post('/' , createPersQuiz);
router.get('/:persQuizId' ,getPersQuiz);
router.patch('/:persQuizId' , updatePersQuiz);
router.delete('/:persQuizId' , deletePersQuiz);

module.exports  = router;