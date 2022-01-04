import { User, UserBase } from '../../interfaces/IUser';
import { mockUserId, MockUserService } from '../../services/mockUserService';
import { UserController } from './user';

const testUser1: User = {
    id: mockUserId,
    login: 'user1',
    password: 'password1',
    isDeleted: false,
    age: 25,
};

const testUser2: User = {
    id: 'userId2',
    login: 'user2',
    password: 'password2',
    isDeleted: false,
    age: 25,
};

const testUserToCreate: UserBase = {
    login: 'user1',
    password: 'password1',
    age: 25,
};

const testUserToUpdate: UserBase = {
    login: 'user1',
    password: 'password1',
    age: 30,
};

describe('UserController', () => {
    const mockUserService = new MockUserService();
    const userController = new UserController(mockUserService);

    beforeEach(() => {
        mockUserService.users = [];
    });

    describe('getUser', () => {
        it('should return user if user exists', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.getUser(mockUserId);
            expect(result).toStrictEqual(testUser1);
        });
        it('should return null if user does not exist', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.getUser('wrongId');
            expect(result).toBe(null);
        });
    });

    describe('createUser', () => {
        it('should return created user if user does not exist', async () => {
            const result = await userController.createUser(testUserToCreate);
            expect(result).toStrictEqual(testUser1);
        });
        it('should return null if user has already created', async () => {
            mockUserService.users = [{ ...testUser1 }];
            const result = await userController.createUser(testUserToCreate);
            expect(result).toBe(null);
        });
        it('should return created user if user is deleted', async () => {
            mockUserService.users = [{ ...testUser1, isDeleted: true }, { ...testUser2 }];
            const result = await userController.createUser(testUserToCreate);
            expect(result).toStrictEqual(testUser1);
        });
    });

    describe('deleteUser', () => {
        it('should return 1 if user exists', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.deleteUser(mockUserId);
            expect(result).toBe(1);
        });
        it('should return 0 if user does not exist', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.deleteUser('wrongId');
            expect(result).toBe(0);
        });
        it('should return 0 if user is already deleted', async () => {
            mockUserService.users = [{ ...testUser1, isDeleted: true }];
            const result = await userController.deleteUser(mockUserId);
            expect(result).toBe(0);
        });
    });

    describe('updateUser', () => {
        it('should return 1 if user exists', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.updateUser(mockUserId, testUserToUpdate);
            expect(result).toBe(1);
        });
        it('should return 0 if user does not exist', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.updateUser('wrongId', testUserToUpdate);
            expect(result).toBe(0);
        });
        it('should return 0 if user is deleted', async () => {
            mockUserService.users = [{ ...testUser1, isDeleted: true }];
            const result = await userController.updateUser(mockUserId, testUserToUpdate);
            expect(result).toBe(0);
        });
    });

    describe('getAutoSuggestUsers', () => {
        it('should return users with "user" substring and limit equals to 2', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.getAutoSuggestUsers({ loginSubstring: 'user', limit: 2 });
            expect(result).toStrictEqual([testUser1, testUser2]);
        });
        it('should return one user with "user" substring and limit equals to 1', async () => {
            mockUserService.users = [{ ...testUser2 }, { ...testUser1 }];
            const result = await userController.getAutoSuggestUsers({ loginSubstring: 'user', limit: 1 });
            expect(result).toStrictEqual([testUser1]);
        });
        it('should return users with "user1" substring and limit equals to 2', async () => {
            mockUserService.users = [{ ...testUser1 }, { ...testUser2 }];
            const result = await userController.getAutoSuggestUsers({ loginSubstring: 'user1', limit: 2 });
            expect(result).toStrictEqual([testUser1]);
        });
    });
});
