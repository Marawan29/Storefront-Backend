import request from 'supertest';
import app from '../../../server'
import jwtSigner from '../../../routes/helpers/jwtSigner'
import { jwtSignature } from '../../../database'


const token = jwtSigner({ token: 'token' }, jwtSignature as string)


describe('GET /products', (): void => {

    it('tests if the endpoint request responds with expected result', async (): Promise<void> => {
        const response = await request(app)
            .get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: 1,
            name: 'mini-minion',
            price: 29,
        }]);
    });

});

describe('GET /products/:id', (): void => {

    it('tests if the endpoint request responds with expected result', async (): Promise<void> => {
        const response = await request(app)
            .get('/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: 'mini-minion',
            price: 29,
        });
    });

});

describe('POST /products', (): void => {

    it('tests if the endpoint creates data', async (): Promise<void> => {
        const response = await request(app)
            .post('/products')
            .set('Authorization', 'bearer ' + token)
            .send({
                name: 'minion statue',
                price: 29,
            });
        expect(response.status).toBe(200);
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .post('/products');
        expect(response.status).toBe(401);
    });

});
