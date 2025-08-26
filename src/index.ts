import express, { json, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import connectDB from './config/database';
import { categoriesRouter } from './routes/categories-route';
import { productsRouter } from './routes/products-route';

/* 
import { configurationRouter, reservationsRouter } from "./api/routes/index.js"; */
const PORT = process.env.PORT;
const app = express();


// por demo
import cors from 'cors';
import { ordersRouter } from './routes/orders-route';

app.use(cors({
  origin: [
    "http://localhost:3000",    // desarrollo
    "https://selvatika.pe"      // tu dominio en producción
  ],
  credentials: true
}));
app.use(json());

// Connect to MongoDB
connectDB();

// ROUTES USER
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    // Handle the error
    res.status(err.status || 500).json({ error: err.message });
});
app.get('/favicon.ico', (_req: Request, res: Response) => res.status(204));

app.get('/', (_req: Request, res: Response) => res.send('hello!'));   

app.listen(PORT, () => {
    console.log(`Server in running on port: ${PORT}`)
});
