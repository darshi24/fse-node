/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} userId User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(userId: string): Promise<User> {
        return await UserModel.findById(userId);
    }

    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * Removes user from the database.
     * @param {string} userId Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(userId: string):  Promise<any> {
        return await UserModel.deleteOne({_id: userId});
    }

    /**
     * Updates user with new values in database
     * @param {string} userId Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(userId: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: userId}, {$set: user});
    }

    deleteAllUsers = async (): Promise<any> =>
        UserModel.deleteMany({});

    deleteUsersByUsername = async (username: string): Promise<any> =>
      UserModel.deleteMany({username});

    findUserByCredentials = async (username: string, password: string): Promise<any> =>
        UserModel.findOne({username: username, password: password});

    findUserByUsername = async (username: string): Promise<any> =>
        UserModel.findOne({username});
}
