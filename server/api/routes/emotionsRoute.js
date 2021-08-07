const router = require('express').Router();
const {
    getAllEmotions,
    createEmotion,
    getEmotion,
    updateEmotion,
    deleteEmotion
} = require('../controllers/emotionsController');


router.get('/' ,getAllEmotions);
router.post('/' , createEmotion);
router.get('/:emotionId' ,getEmotion);
router.patch('/:emotionId' , updateEmotion);
router.delete('/:emotionId' , deleteEmotion);

module.exports  = router;