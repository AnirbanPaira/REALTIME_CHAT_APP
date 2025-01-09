import express from 'express';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import process from 'process';
import dotenv from "dotenv"
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

dotenv.config();
const port = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}
));
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);


app.listen(port, (error) =>{
    if(!error){
        console.log("Server is Successfully Running,and App is listening on port "+ port);
        connectDB ();
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
    }
);