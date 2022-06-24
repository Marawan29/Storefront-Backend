import express from 'express';
import userHandler from './handlers/userHandler';
import orderHandler from './handlers/orderHandler';
import productHandler from './handlers/productHandler';


const routes = express.Router();


routes.use('/users', userHandler);
routes.use('/orders', orderHandler);
routes.use('/products', productHandler);


export default routes;
 