const userModel = require("../modal/User");

const userDetailController=async(req,res)=>{
    try {
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User details"
        })

    } catch (error) {
        res.json({
            message: error.message || error,
             error: true,
            success: false,
        })
    }
}

module.exports = userDetailController