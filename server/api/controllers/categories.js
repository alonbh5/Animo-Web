module.exports = {
    getAllCategories:  (req , res)=>{
        res.status(200).json({
            message: "get all categorie"
        })
    },

    createCategory : (req , res)=>{
        res.status(200).json({
            message: "create new categorie"
        })
    },

    updateCategory : (req , res)=>{
        const CategoryId = req.params.CategoryId;

        res.status(200).json({
            message: `update categorie- ${CategoryId}`
        })
    },

    deleteCategory: (req , res)=>{
        const CategoryId = req.params.CategoryId;

        res.status(200).json({
            message: `delete categorie - ${CategoryId}`
        })
    }
}