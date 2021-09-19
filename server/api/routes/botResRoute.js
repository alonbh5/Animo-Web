const router = require('express').Router();
const {
    getAllBotRes,
    createBotRes,
    getBotRes,
    updateBotRes,
    StartPersQuiz,
    deleteBotRes,
    AnswerPersQuiz,
    talkToBot
} = require('../controllers/botResController');

router.get('/', getAllBotRes);
router.post('/talk', talkToBot);
router.post('/', createBotRes);
router.get('/:botResId', getBotRes);
router.patch('/:botResId', updateBotRes);
router.delete('/:botResId', deleteBotRes);
router.post('/StartPersQuiz/:userId', StartPersQuiz);
router.patch('/addquizans/:userId', AnswerPersQuiz);

module.exports = router;