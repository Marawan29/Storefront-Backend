import jwt from 'jsonwebtoken';


const jwtSigner = (objectToVerify: object, jwtSignature: string) => {
    try {
        const token = jwt.sign(objectToVerify, jwtSignature);
        return token;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
};


export default jwtSigner;
