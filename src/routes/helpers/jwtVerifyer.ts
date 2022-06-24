import express from 'express';
import jwt from 'jsonwebtoken';
import { jwtSignature } from '../../database';


const jwtVerifyer = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, jwtSignature as string);
        //decoded token could be passed to the middleware after it if needed
        next();
    } catch (err) {
        //status code 401: unauthorized request error
        res.status(401).send(`Unauthorized request`);
    }
};


export default jwtVerifyer;
