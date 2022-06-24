import client from '../database';


type order = {
    id?: Number;
    user_id: Number;
    status: string,
}

type orderProductsData = {
    order_id: Number,
    product_id: Number,
    quantity: Number
}


class orders {
    async index(): Promise<order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Couldn't get orders ${err}`);
        }
    }
    async show(id: Number): Promise<order> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE id=$1`;
            const result = await conn.query(sql, [id]);
            //check if there was no order fetched from db
            if (result.rows.length) {
                conn.release();
                return result.rows[0];
            } else {
                throw new Error('Order doesn\'t exist');
            }
        } catch (err) {
            throw new Error(`Couldn't get that order: ${err}`);
        }
    }
    async create(o: order): Promise<order> {
        try {
            const conn = await client.connect();
            const sql1 = 'SELECT id FROM users WHERE id=$1'
            const result1 = await conn.query(sql1, [o.user_id]);
            //check if user exists
            if (result1.rows.length) {
                const sql2 = 'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING id, user_id, status';
                const values = [o.user_id, o.status];
                const result2 = await conn.query(sql2, values);
                conn.release();
                return result2.rows[0];
            } else {
                throw new Error('User Doesn\'t exist');
            }
        } catch (err) {
            throw new Error(`Couldn't create that order: ${err}`);
        }
    }
    async addProduct(orderProductsData: orderProductsData): Promise<orderProductsData> {
        try {
            const conn = await client.connect();
            //check if order exists
            const sql1 = 'SELECT id FROM orders WHERE id=$1'
            const result1 = await conn.query(sql1, [orderProductsData.order_id])
            if (result1.rows.length) {
                //check if product exists
                const sql2 = 'SELECT id FROM products WHERE id=$1';
                const result2 = await conn.query(sql2, [orderProductsData.product_id]);
                if (result2.rows.length) {
                    const sql3 = 'INSERT INTO orders_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING order_id, product_id, quantity';
                    const values = [orderProductsData.order_id, orderProductsData.product_id, orderProductsData.quantity];
                    const result3 = await conn.query(sql3, values);
                    conn.release();
                    return result3.rows[0];
                } else {
                    throw new Error('Product doesn\'t exist');
                }
            } else {
                throw new Error('Order doesn\'t exist');
            }
        } catch (err) {
            throw new Error(`Couldn't add that product: ${err}`);
        }
    }
    async showOrderProducts(order_id: Number): Promise<{ product_id: Number, quantity: Number }[]> {
        try {
            const conn = await client.connect();
            //check if order exists
            const sql1 = 'SELECT id FROM orders WHERE id=$1'
            const result1 = await conn.query(sql1, [order_id])
            if (result1.rows.length) {
                const sql2 = `SELECT product_id, quantity FROM orders_products WHERE order_id=$1`;
                const result2 = await conn.query(sql2, [order_id]);
                conn.release();
                return result2.rows;
            } else {
                throw new Error('Order doesn\'t exist');
            }
        } catch (err) {
            throw new Error(`Couldn't get that order: ${err}`);
        }
    }
}

export { order, orderProductsData, orders }
