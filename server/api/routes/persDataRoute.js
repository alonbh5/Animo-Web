const router = require('express').Router();
const {
    getAllPersData,
    createPersData,
    getPersData,
    updatePersData,
    deletePersData
} = require('../controllers/persDataController');


router.get('/' ,getAllPersData);
router.post('/' , createPersData);
router.get('/:persDataId' ,getPersData);
router.patch('/:persDataId' , updatePersData);
router.delete('/:persDataId' , deletePersData);

module.exports  = router;