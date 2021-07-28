const router = require('express').Router();
const {
    getAllTexts,
    createText,
    getText,
    updateText,
    deleteText
} = require('../controllers/phyData');


router.get('/' ,getAllTexts);
router.post('/' , createText);
router.get('/:textId' ,getText);
router.patch('/:textId' , updateText);
router.delete('/:textId' , deleteText);

module.exports  = router;