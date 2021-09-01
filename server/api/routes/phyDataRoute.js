const router = require('express').Router();
const {
    getAllTexts,
    createText,
    getText,
    getTips,
    getArticles,
    updateText,
    deleteText
} = require('../controllers/phyDataController');


router.get('/' ,getAllTexts);
router.get('/getTips' ,getTips);
router.get('/getArticles' ,getArticles);
router.post('/' , createText);
router.get('/:textId' ,getText);
router.patch('/:textId' , updateText);
router.delete('/:textId' , deleteText);

module.exports  = router;