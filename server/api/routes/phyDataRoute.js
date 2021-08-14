const router = require('express').Router();
const {
    getAllTexts,
    createText,
    getText,
    getTips,
    getArticals,
    updateText,
    deleteText
} = require('../controllers/phyDataController');


router.get('/' ,getAllTexts);
router.get('/getTips' ,getTips);
router.get('/getArticals' ,getArticals);
router.post('/' , createText);
router.get('/:textId' ,getText);
router.patch('/:textId' , updateText);
router.delete('/:textId' , deleteText);

module.exports  = router;