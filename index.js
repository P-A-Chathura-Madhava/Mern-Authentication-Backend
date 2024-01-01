import express from 'express';
import envs from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRoute from './routes/authRoute.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();
envs.config();
dbConnect();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use(express.json());

// app.use('/', (req, res) => {
//     res.send("Server Response");
// })

// app.use(express.json());

// routes
app.use("/api/v1/user", authRoute);

// middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});