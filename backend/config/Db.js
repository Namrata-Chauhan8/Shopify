const mongoose = require("mongoose");

const Db = async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb is connected");
    } catch (error) {
        console.log(error);
    }

}

module.exports=Db; 