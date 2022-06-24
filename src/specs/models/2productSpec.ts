import { product as productType, products as productsClass } from '../../models/product'


const store = new productsClass();


describe('product model', () => {

    describe('create method', () => {

        it('tests if the method exists', (): void => {
            expect(store.create).toBeDefined();
        });

        it('tests if the method add a new product', async (done): Promise<void> => {
            const productData = {
                name: 'mini-minion',
                price: 29
            };
            const newProduct = await store.create(productData);
            expect(newProduct.id).toEqual(1);
            expect(newProduct.name).toEqual('mini-minion');
            expect(newProduct.price).toEqual(29);
            done();
        });

    });

    describe('index method', () => {

        it('tests if the method exists', (): void => {
            expect(store.index).toBeDefined();
        });

        it('tests if the method return the list of all products', async (done): Promise<void> => {
            const productsList = await store.index();
            expect(productsList.length).toEqual(1);
            expect(productsList[0].id).toEqual(1);
            expect(productsList[0].name).toEqual('mini-minion');
            expect(productsList[0].price).toEqual(29);
            done();
        });

    });

    describe('show method', () => {

        it('tests if the method exists', (): void => {
            expect(store.show).toBeDefined();
        });

        it('tests if the method return the list of all users', async (done): Promise<void> => {
            const product = await store.show(1);
            expect(product.name).toEqual('mini-minion');
            expect(product.price).toEqual(29);
            done();
        });

    });

});
