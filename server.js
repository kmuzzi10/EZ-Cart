import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js";
import cors from "cors"

dotenv.config();


//database config
connectDB();

const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api/v1/auth", authRoutes);

// REST API
app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>');
});






























// Server Start
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});












