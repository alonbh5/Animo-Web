const router = require('express').Router();
const {
    getAllAnalyze,
    createAnalyze,
    getAnalyze,
    deleteAnalyze    
} = require('../controllers/analyzeController');


router.get('/' ,getAllAnalyze);
router.post('/' , createAnalyze);
router.get('/:analyzeId' ,getAnalyze);
router.delete('/:analyzeId' , deleteAnalyze);

module.exports  = router;