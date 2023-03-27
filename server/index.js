import  express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from'./routes/dalleRoutes.js';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async(req,res)=>{
    res.status(200).json({
        message:'hello Utkarsh',
    });
});
const startServer=async()=>{
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(9090,()=>console.log('server has started on port http://localhost:9090'))
    } catch (error) {
        console.log(error);
    }
    
};  
startServer();