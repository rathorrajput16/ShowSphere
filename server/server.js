import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { serve } from "inngest/express";
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { functions, inngest } from './inngest/index.js';
import showRouter from './routes/showroutes.js';
import { addShow } from './controllers/showController.js';
import bookingRouter from './routes/boookingRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000;
await connectDB();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

app.get('/',(req,res)=>res.send('server is running'));
app.use('/api/inngest',serve({client:inngest,functions}))
app.use('/api/show',showRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/admin',adminRouter);

app.listen(PORT,()=>console.log(`Server running at port ${PORT}`));

