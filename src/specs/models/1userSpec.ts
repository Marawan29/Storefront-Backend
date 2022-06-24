import { user as userType, users as usersClass } from '../../models/user'


const store = new usersClass();


describe('user model', () => {

    describe('create method', () => {

        it('tests if the method exists', (): void => {
            expect(store.create).toBeDefined();
        });

        it('tests if the method add a new user', async (done): Promise<void> => {
            const userData = {
                first_name: 'minion',
                last_name: 'crafter',
                username: 'minion29',
                password_digest: 'blabla',
            };
            const newUser = await store.create(userData);
            expect(newUser.id).toEqual(1);
            expect(newUser.first_name).toEqual('minion');
            expect(newUser.last_name).toEqual('crafter');
            expect(newUser.username).toEqual('minion29');
            done();
        });

        it('checks if the function checks if the username already exists', async (done): Promise<void> => {
            const userData  = {
                first_name: 'minion',
                last_name: 'crafter',
                username: 'minion29',
                password_digest: 'blabla',
            };

            await expectAsync(store.create(userData)).toBeRejectedWithError('Couldn\'t create that user: Error: An account with same username already exists');
            done();
        });

    });

    describe('index method', () => {

        it('tests if the method exists', (): void => {
            expect(store.index).toBeDefined();
        });

        it('tests if the method return the list of all users', async (done): Promise<void> => {
            const usersList = await store.index();
            expect(usersList.length).toEqual(1);
            expect(usersList[0].id).toEqual(1);
            expect(usersList[0].first_name).toEqual('minion');
            expect(usersList[0].last_name).toEqual('crafter');
            expect(usersList[0].username).toEqual('minion29');
            done();
        });

    });

    describe('show method', () => {

        it('tests if the method exists', (): void => {
            expect(store.show).toBeDefined();
        });

        it('tests if the method return the list of all users', async (done): Promise<void> => {
            const user = await store.show(1);
            expect(user.first_name).toEqual('minion');
            expect(user.last_name).toEqual('crafter');
            expect(user.username).toEqual('minion29');
            done();
        });

    });

    describe('authenticate method', () => {

        it('tests if the method exists', (): void => {
            expect(store.authenticate).toBeDefined();
        });

        it('tests if the method authenticates with correct input', async (done): Promise<void> => {
            const userData = { username: 'minion29', password_digest: 'blabla' };
            const authenticate = await store.authenticate(userData);
            const authenticatedUserData = authenticate as userType;
            expect(authenticatedUserData.id).toEqual(1);
            expect(authenticatedUserData.first_name).toEqual('minion');
            expect(authenticatedUserData.last_name).toEqual('crafter');
            expect(authenticatedUserData.username).toEqual('minion29');
            done();
        });

        it('tests if the method deauthenticates with incorrect password only', async (done): Promise<void> => {
            const userData = { username: 'minion29', password_digest: 'nothing important' };
            await expectAsync(store.authenticate(userData)).toBeRejectedWithError('Error: incorrect username or password');
            done();
        });

        it('tests if the method deauthenticates with incorrect username and password', async (done): Promise<void> => {
            const userData = { username: 'nothing important', password_digest: 'nothing important also' };
            await expectAsync(store.authenticate(userData)).toBeRejectedWithError('Error: incorrect username');
            done();
        });

    });

    describe('showOrdersByUser method', () => {

        it('tests if the method exists', (): void => {
            expect(store.showOrdersByUser).toBeDefined();
        });

        it('tests if the method return the list of all orders by user', async (done): Promise<void> => {
            await expectAsync(store.showOrdersByUser(1)).toBeRejectedWithError('Couldn\'t get that order: Error: No orders by that user');
            done();
        });

        it('tests if the method ckecks if user exists or not', async (done): Promise<void> => {
            await expectAsync(store.showOrdersByUser(2)).toBeRejectedWithError('Couldn\'t get that order: Error: User doesn\'t exist');
            done();
        });

    });

});
