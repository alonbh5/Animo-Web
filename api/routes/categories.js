const router = require('express').Router();
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');


router.get('/' ,getAllCategories);
router.post('/' , createCategory);
router.patch('/:CategoryId' , updateCategory);
router.delete('/:CategoryId' , deleteCategory);

module.exports  = router;