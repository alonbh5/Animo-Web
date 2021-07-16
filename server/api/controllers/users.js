module.exports = {
    login:  (req , res)=>{
        res.status(200).json({
            message: "login"
        })
    },

    signup : (req , res)=>{
        res.status(200).json({
            message: "signup"
        })
    }
}