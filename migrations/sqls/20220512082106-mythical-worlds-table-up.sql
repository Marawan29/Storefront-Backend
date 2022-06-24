CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), username VARCHAR(50), password_digest TEXT);
CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price INT);
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), status VARCHAR(32));
CREATE TABLE orders_products (id SERIAL PRIMARY KEY, order_id INT REFERENCES orders(id), product_id INT REFERENCES products(id), quantity INTEGER);