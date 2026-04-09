import userRepository from "../repositories/user.repository.js";

class UserService {
    async userRegister(data) {
        if(getUser(data.login)){
            throw new Error(`User with login ${data.login} already registered`);
        }
        const roles = [...new Set(data.roles)];
        return await userRepository.userRegister(data);
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

export default new UserService();