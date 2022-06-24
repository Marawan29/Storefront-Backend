import request from 'supertest';
import app from '../../../server'
import jwtSigner from '../../../routes/helpers/jwtSigner'
import { jwtSignature } from '../../../database'


const token = jwtSigner({ token: 'token' }, jwtSignature as string)


describe('GET /orders', (): void => {

    it('tests if the endpoint request with an authorized request responds with expected result', async (): Promise<void> => {
        const response = await request(app)
            .get('/orders')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: 1,
            user_id: 1,
            status: "incomplete",
        }]);
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .get('/orders');
        expect(response.status).toBe(401);
    });

});

describe('GET /orders/:id', (): void => {

    it('tests if the endpoint request with an authorized request responds with expected result', async (): Promise<void> => {
        const response = await request(app)
            .get('/orders/1')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            user_id: 1,
            status: "incomplete",
        });
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .get('/orders');
        expect(response.status).toBe(401);
    });

});

describe('POST /orders', (): void => {

    it('tests if the endpoint creates data', async (): Promise<void> => {
        const response = await request(app)
            .post('/orders')
            .set('Authorization', 'bearer ' + token)
            .send({
                user_id: 1,
                status: 'incomplete',
            });
        expect(response.status).toBe(200);
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .post('/orders');
        expect(response.status).toBe(401);
    });

});

describe('POST /orders/:id/porducts', (): void => {
     
    it('tests if the endpoint add Products to order', async (): Promise<void> => {
        const response = await request(app)
            .post('/orders/2/products')
            .set('Authorization', 'bearer ' + token)
            .send({
                product_id: 1,
                quantity: 29,
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            order_id: 2,
            product_id: 1,
            quantity: 29,
        });
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .post('/orders/2/products');
        expect(response.status).toBe(401);
    });

});

describe('GET /orders/:id/porducts', (): void => {

    it('tests if the endpoint add Products to order', async (): Promise<void> => {
        const response = await request(app)
            .get('/orders/2/products')
            .set('Authorization', 'bearer ' + token)     
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            product_id: 1,
            quantity: 29,
        }]);
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .get('/orders/1/products');
        expect(response.status).toBe(401);
    });

});
