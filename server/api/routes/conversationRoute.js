const router = require('express').Router();
const {
    getAllConversation,
    createConversation,
    getConversation,
    updateConversation,
    deleteConversation    
} = require('../controllers/conversationController');

router.get('/' ,getAllConversation);
router.post('/' , createConversation);
router.get('/:conversationId' ,getConversation);
router.patch('/:conversationId' , updateConversation);
router.delete('/:conversationId' , deleteConversation);

module.exports  = router;