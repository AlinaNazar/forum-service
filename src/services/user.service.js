import userRepository from "../repositories/user.repository.js";

class UserService {
    async userRegister(data) {
        if (await userRepository.getUser(data.login)) {
            throw new Error(`User with login ${data.login} already registered`);
        }
        const roles = [...new Set(data.roles)];
        return await userRepository.userRegister({...data, roles});
    }

    async userLogin(login, password) {
        //TODO login
        throw new Error('Not implemented');
    }

    async deleteUser(login) {
        //TODO delete user with security
        const user = await userRepository.deleteUser(login);
        if (!user) {
            throw new Error(`User with login ${login} not found`)
        }
        return user;
    }

    async updateUser(login, data) {
        const user = await userRepository.updateUser(login, data);
        if (!user) {
            throw new Error(`User with login ${login} not found`);
        }
        return user;
    }

    async addRole(login, role) {
        const user = await userRepository.addRole(login, role);
        if (!user) {
            throw new Error(`User with login ${login} not found`);
        }
        return user;
    }

    async deleteRole(login, role) {
        return await userRepository.deleteRole(login, role);
    }

    async changePassword(password) {
        //TODO
        throw new Error('Not implemented');
    }

    async getUser(login) {
        return await userRepository.getUser(login);
    }
}

export default new UserService();