import userAccountRepository from "../repositories/userAccount.repository.js";

class UserAccountService {
    async register(user) {
        try {
            return await userAccountRepository.addUser(user);
        } catch (err) {
            console.log(err);
            throw new Error('User already exists');
        }
    }

    async login(login) {
        //TODO: Implement role addition/removal logic
        throw new Error('Method not implemented');
    }

    async removeUser(login) {
        const userAccount = await userAccountRepository.removeUser(login);
        if (!userAccount) {
            throw new Error(`User with login ${login} is not found`);
        }
        return userAccount;
    }

    async updateUser(login, updateData) {
        const userAccount = await userAccountRepository.updateUser(login, updateData);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    // async addRole(login, role){
    //     //TODO: Implement role addition/removal logic
    //     throw new Error('Method not implemented');
    // }

    async changeRoles(login, role, isAddRole) {
        role = role.toUpperCase();
        let userAccount;
        if (isAddRole) {
            userAccount = await userAccountRepository.addRole(login, role);
        } else {
            userAccount = await userAccountRepository.deleteRole(login, role);
        }
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        // const {roles} = userAccount;
        // return {login, roles};
        const {firstName, lastName, ...userRoles} = userAccount.toObject();
        return userAccount;
    }

    async changePassword(password) {
        //TODO: Implement password change logic
        throw new Error('Method not implemented');
    }

    async getUser(login) {
        const userAccount = await userAccountRepository.findUser(login);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }
}

export default new UserAccountService();