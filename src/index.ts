import express, { json, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import connectDB from './config/database';
import cors from 'cors';
import { categoriesRouter } from './routes/categories-route';
import { productsRouter } from './routes/products-route';
import { ordersRouter } from './routes/orders-route';
import { adminRouter } from './routes/admin-route';
import { imagesRouter } from './routes/images-route';

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(json());

// Connect to MongoDB
connectDB();

// ROUTES USER
app.use('/admin', adminRouter);
app.use('/assets', imagesRouter);
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
