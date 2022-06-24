import { order as orderType, orderProductsData, orders as ordersClass } from '../../models/order'


const store = new ordersClass();


describe('order model', () => {

    describe('create method', () => {

        it('tests if the method exists', (): void => {
            expect(store.create).toBeDefined();
        });

        it('tests if the method add a new user', async (done): Promise<void> => {
            const orderData = {
                user_id: 1,
                status: 'incomplete',
            };
            const newOrder = await store.create(orderData);
            expect(newOrder.id).toEqual(1);
            expect(newOrder.user_id).toEqual(1);
            expect(newOrder.status).toEqual('incomplete');
            done();
        });

        it('checks if the function checks if the user_id already exists', async (done): Promise<void> => {
            const orderData = {
                user_id: 2,
                status: 'incomplete',
            };
            await expectAsync(store.create(orderData)).toBeRejectedWithError('Couldn\'t create that order: Error: User Doesn\'t exist');
            done();
        });

    });

    describe('index method', () => {

        it('tests if the method exists', (): void => {
            expect(store.index).toBeDefined();
        });

        it('tests if the method return the list of all users', async (done): Promise<void> => {
            const ordersList = await store.index();
            expect(ordersList.length).toEqual(1);
            expect(ordersList[0].id).toEqual(1);
            expect(ordersList[0].user_id).toEqual(1);
            expect(ordersList[0].status).toEqual('incomplete');
            done();
        });

    });

    describe('show method', () => {

        it('tests if the method exists', (): void => {
            expect(store.show).toBeDefined();
        });

        it('tests if the method return the list of all orders', async (done): Promise<void> => {
            const order = await store.show(1);
            expect(order.id).toEqual(1);
            expect(order.user_id).toEqual(1);
            expect(order.status).toEqual('incomplete');
            done();
        });

    });

    describe('addproduct method', () => {

        it('tests if the method exists', (): void => {
            expect(store.addProduct).toBeDefined();
        });

        it('tests if the method can add products to existing orders', async (done): Promise<void> => {
            const orderProductsData = {
                order_id: 1,
                product_id: 1,
                quantity: 2,
            };
            const addedProduct = await store.addProduct(orderProductsData);
            expect(addedProduct.order_id).toEqual(1);
            expect(addedProduct.product_id).toEqual(1);
            expect(addedProduct.quantity).toEqual(2);
            done();
        });

        it('tests if the method checks if order exist or not', async (done): Promise<void> => {
            const orderProductsData = {
                order_id: 2,
                product_id: 1,
                quantity: 2,
            };
            await expectAsync(store.addProduct(orderProductsData)).toBeRejectedWithError('Couldn\'t add that product: Error: Order doesn\'t exist');
            done();
        });

        it('tests if the method checks if product exist or not', async (done): Promise<void> => {
            const orderProductsData = {
                order_id: 1,
                product_id: 2,
                quantity: 2,
            };
            await expectAsync(store.addProduct(orderProductsData)).toBeRejectedWithError('Couldn\'t add that product: Error: Product doesn\'t exist');
            done();
        });

    });

    describe('showOrderProducts method', () => {

        it('tests if the method exists', (): void => {
            expect(store.showOrderProducts).toBeDefined();
        });

        it('tests if the method return the list of all products in an order', async (done): Promise<void> => {
            const orderProducts = await store.showOrderProducts(1);
            expect(orderProducts.length).toEqual(1);
            expect(orderProducts[0].product_id).toEqual(1);
            expect(orderProducts[0].quantity).toEqual(2);
            done();
        });

        it('tests if the method checks if order exists or not', async (done): Promise<void> => {
            await expectAsync(store.showOrderProducts(2)).toBeRejectedWithError('Couldn\'t get that order: Error: Order doesn\'t exist');
            done();
        });

    });

});
