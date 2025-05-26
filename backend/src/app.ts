import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index';
import cors from "cors";
import cookieParser from "cookie-parser";

config();

const app = express();

// List of allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://3pdb8t04-5173.inc1.devtunnels.ms',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", appRouter);

export default app;
