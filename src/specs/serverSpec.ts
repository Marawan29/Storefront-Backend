import request from 'supertest';
import app from '../server';

describe('Get /', () => {
    it('tests if the server is working', async (): Promise<void> => {
        request(app)
            .get('/')
            .then((response: request.Response): void => {
                expect(response.status).toBe(200);
            });
    });
});
