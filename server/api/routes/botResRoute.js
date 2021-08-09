const router = require('express').Router();
const {
    getAllBotRes,
    createBotRes,
    getBotRes,
    updateBotRes,
    deleteBotRes
} = require('../controllers/botResController');


router.get('/' ,getAllBotRes);
router.post('/' , createBotRes);
router.get('/:botResId' ,getBotRes);
router.patch('/:botResId' , updateBotRes);
router.delete('/:botResId' , deleteBotRes);

module.exports  = router;