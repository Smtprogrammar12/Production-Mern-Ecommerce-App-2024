import express  from "express";
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan";
import userRoute from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import dbConnect from "./config/database.js";
import cors from "cors";
import path from "path";



// Load env vars
dotenv.config();

// dB call
dbConnect();


const app = express();







// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname , './client/build')));


//API
app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

app.use("*" , function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.get('/', (req, res) => {
    res.send("<h1>Welcome to My Own Ecommerce App</h1>");
});


// PORT
const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`Server is running on ${colors.green("http://localhost:8080")}`);
});