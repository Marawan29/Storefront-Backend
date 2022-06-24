import { default as client, pepper, saltRounds } from '../database';
import bcrypt from 'bcrypt';
import { order as orderType } from './order';


type user = {
    id?: Number;
    first_name: string;
    last_name: string;
    username: string;
    password_digest: string;
}


class users {
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT id, first_name, last_name, username FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Couldn't get users ${err}`);
        }
    }
    async show(id: Number): Promise<user> {
        try {
            const conn = await client.connect();
            const sql = `SELECT id, first_name, last_name, username FROM users WHERE id=$1`;
            const result = await conn.query(sql, [id]);
            //check if there was no user fetched from db
            if (result.rows.length) {
                conn.release();
                return result.rows[0];
            } else {
                throw new Error('User doesn\'t exist');
            }
        } catch (err) {
            throw new Error(`Couldn't get that user ${err}`);
        }
    }
    async create(u: user): Promise<user> {
        try {
            const conn = await client.connect();
            //check if username already exists
            const sql1 = `SELECT username FROM users WHERE username = $1`;
            const result1 = await conn.query(sql1, [u.username]);
            const numOfUsersWithSameUsername = result1.rows.length
            if (!numOfUsersWithSameUsername) {
                const sql2 = 'INSERT INTO users(first_name, last_name, username, password_digest) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, username';
                const hash = bcrypt.hashSync(u.password_digest + pepper, parseInt(saltRounds as string));
                //define the user data to an array (user data not passed directly to the sql query due to some security reasons regarding sql-injetion)
                const values = [u.first_name, u.last_name, u.username, hash];
                const result2 = await conn.query(sql2, values);
                conn.release();
                return result2.rows[0];
            } else {
                throw new Error('An account with same username already exists');
            }
            
        } catch (err) {
            throw new Error(`Couldn't create that user: ${err}`);
        }
    }
    async authenticate(u: {username:string, password_digest: string}): Promise<user | void> {
        try {
            const conn = await client.connect();
            const sql1 = `SELECT username, password_digest FROM users WHERE username = $1`;
            const result1 = await conn.query(sql1, [u.username]);
            if (result1.rows.length) {
                const user = result1.rows[0]
                if (bcrypt.compareSync(u.password_digest + pepper, user.password_digest)) {
                    const sql2 = 'SELECT id, first_name, last_name, username FROM users WHERE username=$1';
                    const result2 = await conn.query(sql2, [user.username]);
                    conn.release();
                    return result2.rows[0];
                } else {
                    throw new Error('incorrect username or password')
                }
            } else {
                throw new Error('incorrect username')
            }
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async showOrdersByUser(user_id: Number): Promise<orderType[]> {
        try {
            const conn = await client.connect();
            //check if user exists
            const sql1 = `SELECT * FROM users WHERE id=$1`;
            const result1 = await conn.query(sql1, [user_id]);
            if (result1.rows.length) {
                const sql2 = `SELECT * FROM orders WHERE user_id=$1`;
                const result2 = await conn.query(sql2, [user_id]);
                //check if there was no orders by that user
                if (result2.rows.length) {
                    conn.release();
                    return result2.rows;
                } else {
                    throw new Error('No orders by that user');
                }
            } else {
                throw new Error('User doesn\'t exist');
            }
            
        } catch (err) {
            throw new Error(`Couldn't get that order: ${err}`);
        }
    }
}

export {user, users}
