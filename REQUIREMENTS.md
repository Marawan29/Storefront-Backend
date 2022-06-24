# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Products
- Index /products [GET]
- Show (args: id) /products/:id [GET]
- Create (args: Product)[token required] /products [POST]
### Users
- Index [token required] /users[GET]
- Show (args: id)[token required] /users/:id [GET]
- Create (args: User) /users[POST]
- Login (args: username and password) /users/login [POST]

### Orders
- Index [token required] /orders [GET]
- Show (arg: id)[token required] /orders/:id [GET]
- Create (args: order)[token required] /orders [POST]
- Current Order by user (args: user id)[token required] /users/:id/orders [GET]
- Add products to existing order (args: order_id product_id quantity)[token required] /orders/:id/products [POST]
- Show products of existing order (args:  order_id)[token required] /orders/:id/products [GET]

## Data Shapes
### Product
- id
- name
- price	
- [OPTIONAL] category

### User
- id
- firs_name
- last_name
- username
- password

### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Schema

database<br>
|<br>
|->tables<br>
  |->users<br>
  |  |->id: [SERIAL PRIMARY KEY]<br>
  |  |->first_name: [VARCHAR(50)]<br>
  |  |->last_name: [VARCHAR(50)]<br>
  |  |->username: [VARCHAR(50)]<br>
  |  |->password_digest: [TEXT]<br>
  |<br>
  |->orders<br>
  |  |->id: [SERIAL PRIMARY KEY]<br>
  |  |->user_id: [INT] REFRENCES users(id)<br>
  |  |->status: [VARCHAR(32)]<br>
  |<br>
  |->products<br>
  |  |->id: [SERIAL PRIMARY KEY]<br>
  |  |->name: [TEXT]<br>
  |  |->price: [INT]<br>
  |<br>
  |->orders_products<br>
    |->id: [SERIAL PRIMARY KEY]<br>
    |->order_id: [INT] REFRENCES orders(id)<br>
    |->products_id: [INT] REFRENCES products(id)<br>
    |->quantity: [INT]