const mongoose=require("mongoose");
async function connectDb(){
    try{  
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MONGO DB Succesfully!")
    }
    catch(err){
        console.log("Connection failed!!")
        process.exit(1);//exit with failure
    }
}
module.exports=connectDb;
// mongodb+srv://prernadas9_db_user:<db_password>@cluster0.fd04d7a.mongodb.net/?appName=Cluster0