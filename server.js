import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js";

dotenv.config();


//database config
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));


//routes

app.use("/api/v1/auth", authRoutes);



//rest API
app.get('/',(req,res)=>{
res.send('<h1>Welcome</h1>')
});











const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})