import express from 'express';
import { user as userType, users as usersClass } from '../../models/user';
import { jwtSignature } from '../../database';
import jwtSigner from '../helpers/jwtSigner'
import jwtVerifyer from '../helpers/jwtVerifyer';



const userHandler = express.Router();
const store = new usersClass();


//RESTful routes middlewares

const index = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const userID = parseInt(req.param('id'));
        const userData = await store.show(userID);
        res.json(userData);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user: userType = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password_digest: req.body.password_digest,
        };
        const newUser = await store.create(user);
        const signedUser = jwtSigner(newUser, jwtSignature as string);
        res.json(signedUser);
    } catch (err) {
        res.status(500).send(`${err}`);
    }
};


//other middlewares

const authenticate = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user: { username: string, password_digest: string } = {
            username: req.body.username,
            password_digest: req.body.password_digest,
        }
        const userData = await store.authenticate(user);
        const signedUser = jwtSigner(userData as userType, jwtSignature as string);
        res.json(signedUser);
    } catch (err) {
        res.status(401).send(`Error: ${err}`);
    }
}

const showOrdersByUser = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user_id = parseInt(req.param('id'));
        const orderData = await store.showOrdersByUser(user_id);
        res.json(orderData);
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
}


//RESTful routes

userHandler.get('/', jwtVerifyer, index);
userHandler.get('/:id', jwtVerifyer, show);
userHandler.post('/', create)


//other routes

userHandler.get('/:id/orders', showOrdersByUser);
userHandler.post('/login', authenticate);

export default userHandler;