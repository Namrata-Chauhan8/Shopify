const userModal = require("../modal/User");

async function allUsers(req,res){
    try {
        const userId=req.userId
        const allUsers=await userModal.find()

        res.status(200).json({
            data : allUsers,
            error : false,
            success : true,
            message : "All users"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message,
          });
    }
}

module.exports = allUsers