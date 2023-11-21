import mongoose from "mongoose";

const connectDB = async ()=>{
try{
const connection = await mongoose.connect("mongodb://127.0.0.1:27017/EcommerceDB");
console.log(`MongoDB connected : ${connection.connection.host}`);
}catch(err){
    console.log("Error connecting to database: ", err);
}
};

export default connectDB;