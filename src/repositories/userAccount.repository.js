import UserAccount from "../models/userAccount.model.js";
import bcrypt from "bcrypt";

class UserAccountRepository {

    // async saltMaker(password) {
    //     const salt = await bcrypt.genSalt(12);
    //     return bcrypt.hash(password, salt);
    // }

    async addUser(user) {
        // const hashedPassword = await this.saltMaker(user.password);
        // return UserAccount.create({...user, password: hashedPassword});
        return UserAccount.create(user);
    }

    async findUser(login) {
        return UserAccount.findById(login).exec();
    }

    async removeUser(login) {
        return UserAccount.findByIdAndDelete(login).exec();
    }

    async updateUser(login, updateData) {
        return UserAccount.findByIdAndUpdate(login, updateData, {new: true}).exec();
    }

    async addRole(login, role) {
        return UserAccount.findByIdAndUpdate(login, {$addToSet: {roles: role}}, {new: true}).exec();
    }

    async removeRole(login, role) {
        return UserAccount.findByIdAndUpdate(login, {$pull: {roles: role}}, {new: true}).exec();
    }

    async changePassword(login, newPassword) {
        const user = await UserAccount.findById(login);
        if (user) {
            user.password = newPassword;
            return user.save();
        }
    }
}

export default new UserAccountRepository();