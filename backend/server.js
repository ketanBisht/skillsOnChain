import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config();         

import connectDB from "./config/db.js";


connectDB();


app.listen(3000);