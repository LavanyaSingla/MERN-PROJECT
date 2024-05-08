const mongoose = require("mongoose");

const connectDB=()=>{
    try {
        const data= mongoose.connect("mongodb://localhost:27017/Ecommerce", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log(`Mongodb connected  with server ${data.connection.host}`)
    }
    catch(error){
        console.log(error);
    }
}

module.exports=connectDB;
