import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    SERVER_PORT,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    JWT_SIGNATURE,
    ENV,
} = process.env

let client: Pool = new Pool({
    host: '',
    database: '',
    user: '',
    password: '',
});

if (ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}


export default client;
export { BCRYPT_PASSWORD as pepper, SALT_ROUNDS as saltRounds, JWT_SIGNATURE as jwtSignature, SERVER_PORT as port};