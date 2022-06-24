import express from 'express';
import { product as productType, products as productsClass } from '../../models/product';
import jwtVerifyer from '../helpers/jwtVerifyer';


const productHandler = express.Router();
const store = new productsClass();


//RESTful routes middlewares

const index = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const product = await store.index();
        res.json(product);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const productID = parseInt(req.param('id'));
        const productData = await store.show(productID);
        res.json(productData);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const product: productType = {
            name: req.body.name,
            price: req.body.price,
        }
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};


//RESTful routes

productHandler.get('/', index);
productHandler.get('/:id', show);
productHandler.post('/', jwtVerifyer, create)


export default productHandler;