import request from 'supertest';
import app from '../../../server'
import jwtSigner from '../../../routes/helpers/jwtSigner'
import { jwtSignature } from '../../../database'


const token = jwtSigner({ token: 'token' }, jwtSignature as string)


describe('GET /users', (): void => {

    it('tests if the endpoint request with an authorized request respond with expected result', async (): Promise<void> => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: 1,
            first_name: "minion",
            last_name: "crafter",
            username: "minion29",
        }]);
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .get('/users');
        expect(response.status).toBe(401);
    });

});

describe('GET /users/:id', (): void => {

    it('tests if the endpoint request with an authorized request respond with expected result', async (): Promise<void> => {
        const response = await request(app)
            .get('/users/1')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            first_name: "minion",
            last_name: "crafter",
            username: "minion29",
        });
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .get('/users/1');
        expect(response.status).toBe(401);
    });

});

describe('POST /users', (): void => {

    it('tests if the endpoint creates data', async (): Promise<void> => {
        const response = await request(app)
            .post('/users')
            .send({
                first_name: 'new-minion',
                last_name: 'new-crafter',
                username: 'new-minion29',
                password_digest: '29',
            });
        expect(response.status).toBe(200);
    });

});

describe('GET /users/:id/orders', (): void => {

    it('tests if the endpoint request with an authorized request respond with expected result', async (): Promise<void> => {
        const response = await request(app)
            .get('/users/1/orders')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: 1,
            user_id: 1,
            status: "incomplete",
        }, {
            id: 2,
            user_id: 1,
            status: "incomplete",
        }]);
    });

    it('tests if the endpoint request with an unauthorized request fails successfully', async (): Promise<void> => {
        const response = await request(app)
            .get('/users/');
        expect(response.status).toBe(401);
    });

});

describe('POST /users/login', (): void => {

    it('tests if the endpoint authenticates with correct input', async (): Promise<void> => {
        const response = await request(app)
            .post('/users/login')
            .send({
                username: 'new-minion29',
                password_digest: '29',
            });
        expect(response.status).toBe(200);
    });

    it('tests if the endpoint deauthenticates with correct input', async (): Promise<void> => {
        const response = await request(app)
            .post('/users/login')
        expect(response.status).toBe(401);
    });

});

