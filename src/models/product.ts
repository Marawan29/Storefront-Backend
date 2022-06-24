import client from '../database';


type product = {
    id?: Number;
    name: string,
    price: Number,
}


class products {
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Couldn't get products ${err}`);
        }
    }
    async show(id: Number): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM products WHERE id=$1`;
            const result = await conn.query(sql, [id]);
            //check if there was no order fetched from db
            if (result.rows.length) {
                conn.release();
                return result.rows[0];
            } else {
                throw new Error('Product doesn\'t exist');
            }
        } catch (err) {
            throw new Error(`Couldn't get that product: ${err}`);
        }
    }
    async create(p: product): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products(name, price) VALUES($1, $2) RETURNING id, name, price';
            const values = [p.name, p.price];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];

        } catch (err) {
            throw new Error(`Couldn't create that product ${err}`);
        }
    }
}

export { product, products }