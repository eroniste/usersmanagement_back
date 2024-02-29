import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './router';
import mongoose from 'mongoose';
import { connectToDatabase } from './db/db';

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}

dotenv.config();
const app = express();
mongoose.set('strictQuery', false); // Set the strictQuery option to false

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

connectToDatabase();
app.use('/', router());
export default app;