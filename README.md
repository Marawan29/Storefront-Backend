## Storefront Backend Project
### Breif Info
This package is a storefront backend API, written in SQL and Typescript.
### Requermints
1. You should have node.js and npm installed on your machine.
2. You should have two postgres databases ready.
### installation
1. First, if you don't have node.js and npm 
   - Head to the offical download page [Node.js](https://nodejs.org/en/download/)
   - Follow instllation steps until you have it ready on your machine
2. IF you don't have postgres and two databases ready:
   - Install postgres on your system [Postgres Downloads](https://www.postgresql.org/download/)
   - Open any terminal or command line and type:
     - >psql -U **_your-usernmae_**<br>
       >**_enter your passwword_**<br>
       >CREATE DATABSE **_your-dev-database-name_**;<br>
       >CREATE DATABSE **_your-test-database-name_**;<br>
       >GRANT ALL PRIVILEGES ON  **_your-dev-database-name_** TO **_your-usernmae_**;<br>
       >GRANT ALL PRIVILEGES ON  **_your-test-database-name_** TO **_your-usernmae_**;
3. open any terminal or command line in the package directory and run:
   - >npm install
4. Head to the package directory then:-
   - Create a file and rename it to .env (**_Be carful of the file name extension_**)
   - Enter your entities in it in a form similar to that one [.env.example](.env.example)
5. Now take a look at the avilable scripts in [package.json](package.json) and you are ready to go
### Extra tips
I really can't bear leaving you stuck trying to discover what form your request should be when requesting the endpoints<br>
and didn't know where to mention them or make them easy to discover either, so here you are<br>

#### users 
1. index [/users](/users) [GET] (token required)
   - just send a request
2. show [/users/:id](/users/:id) [GET] (token required)
   - provide the user id in the uri
3. create [/users](/users) [POST] (token required)
   - request body should have
     - >{"first_name": "", "last_name": "", "username": "", "password_digest": ""}
4. login [/users/login] (/users/login) [POST]
   - request body should have
     - >{"username": "", "password_digest": ""}
5. show user's orders [/users/:id/orders](/users/:id/orders) [GET] (token required)
   - provide the user id in the uri
#### products
1. index [/products](/products) [GET]
   - just send a request
2. show [/products/:id](/products/:id) [GET]
   - provide the product id in the uri
3. create [/products](/proucts) [POST] (token required)
   - request body should have
     - >{"name": "", "price": ""}
#### orders
1. index [/orders](/orders) [GET] (token required)
   - just send a request
2. show [/orders/:id](/orders/:id) [GET] (token required)
   - provide the order id in the uri
3. create [/order](/orders) [POST] (token required)
   - request body should have
     - >{"user_id": "", "status": ""}
4. addProducts to order [/orders/:id/products](/orders/:id/products) [POST] (token required)
   - provide the order id in the uri
   - request body should have
     - >{"product_id": "", "quantity": ""}
5. showProducts of order [/orders/"id/products](/orders/:id/products) [GET] (token required)
   - provide the order id in the uri