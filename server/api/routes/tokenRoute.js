const router = require('express').Router();
const {
    getAllTokens,
    createTokens,
    getToken,
    updateToken,
    deleteToken
} = require('../controllers/token');


router.get('/' ,getAllTokens);
router.post('/' , createTokens);
router.get('/:tokenId' ,getToken);
router.patch('/:tokenId' , updateToken);
router.delete('/:tokenId' , deleteToken);

module.exports  = router;