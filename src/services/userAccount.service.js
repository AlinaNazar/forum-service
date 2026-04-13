import userAccountRepository from "../repositories/userAccount.repository.js";
import {NotFoundError} from "../error/errors.js";

class UserAccountService {
    ifUserExists(userAccount, login){
        if(!userAccount){
            throw new NotFoundError(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async register(user) {
            return userAccountRepository.addUser(user);
    }

    async login(login) {
        //TODO: Implement role addition/removal logic
        throw new Error('Method not implemented');
    }

    async removeUser(login) {
        const userAccount = await userAccountRepository.removeUser(login);
        return this.ifUserExists(userAccount, login);
    }

    async updateUser(login, updateData) {
        const userAccount = await userAccountRepository.updateUser(login, updateData);
        return this.ifUserExists(userAccount, login);
    }

    async changeRoles(login, role, isAddRole) {
        //role = role.toUpperCase();
        // let userAccount;
        // if (isAddRole) {
        //     userAccount = await userAccountRepository.addRole(login, role);
        // } else {
        //     userAccount = await userAccountRepository.removeRole(login, role);
        // }

        const userAccount = isAddRole
            ? await userAccountRepository.addRole(login, role)
            : await userAccountRepository.updateUser(login, role);
        this.ifUserExists(userAccount, login);
        const {firstName, lastName, ...userRoles} = userAccount.toObject();
        return userRoles;
    }

    async changePassword(login, newPassword) {
        const userAccount = await userAccountRepository.findUser(login);
        if (!userAccount) {throw new NotFoundError(`User with login ${login} not found`);}
        userAccount.password = newPassword;
        await userAccount.save();
    }

    async getUser(login) {
        const userAccount = await userAccountRepository.findUser(login);
        return this.ifUserExists(userAccount, login);
    }
}

export default new UserAccountService();