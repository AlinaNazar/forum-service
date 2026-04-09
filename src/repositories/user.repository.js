import User from '../models/user.model.js';

class UserRepository{
    async userRegister(data) {
        return User.create(data);
    }

    async userLogin(userName, password) {
        //TODO login
    }

    async deleteUser(userName) {
        //TODO delete user
    }

    async updateUser(userName, data) {
        //TODO
    }

    async addRole(userName, role) {
        //TODO
    }

    async deleteRole(userName, role) {
        //TODO
    }

    async changePassword(password) {
        //TODO
    }

    async getUser(userName) {
        //TODO
    }
}

export default new UserRepository();