import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";


dotenv.config();


//database config
connectDB();

const app = express();


//middlewares
app.use(cors({
  origin: 'http://localhost:3000',  // replace with your frontend origin
  credentials: true,  // allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)
app.use('/api/v1/cart', cartRoutes);

// REST API
//rest api for test
app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>');
});


// Server Start
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
