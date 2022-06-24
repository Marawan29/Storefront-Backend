import express from 'express';
import { order as orderType, orderProductsData, orders as ordersClass } from '../../models/order';
import jwtVerifyer from '../helpers/jwtVerifyer';


const orderHandler = express.Router();
const store = new ordersClass();


//RESTful routes middlewares

const index = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const order = await store.index();
        res.json(order);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const orderID = parseInt(req.param('id'));
        const orderData = await store.show(orderID);
        res.json(orderData);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const order: orderType = {
            user_id: req.body.user_id,
            status: req.body.status,
        }
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};


//other middlewares

const addProduct = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const orderProductData: orderProductsData = {
            order_id: parseInt(req.param('id')),
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        }
        const adddedProduct = await store.addProduct(orderProductData);
        res.json(adddedProduct);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
}

const showOrderProducts = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const order_id = parseInt(req.param('id'))
        const orderProducts = await store.showOrderProducts(order_id);
        res.json(orderProducts);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
}


//RESTful routes

orderHandler.get('/', jwtVerifyer, index);
orderHandler.get('/:id', jwtVerifyer, show);
orderHandler.post('/', jwtVerifyer, create)


//other routes

orderHandler.get('/:id/products', jwtVerifyer, showOrderProducts);
orderHandler.post('/:id/products', jwtVerifyer, addProduct);


export default orderHandler;