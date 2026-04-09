import User from '../models/user.model.js';

class UserRepository{
    async userRegister(data) {
        return User.create(data);
    }

    async userLogin(login, password) {
        //TODO login
        throw new Error('Not implemented');
    }

    async deleteUser(login) {
        return User.findOneAndDelete({login}).exec();
    }

    async updateUser(login, data) {
       return User.findOneAndUpdate({login}, data, {returnDocument: 'after'})
           .select('-_id').exec();
    }

    async addRole(login, role) {
        return User.findOneAndUpdate(
            {login},
            {$addToSet: {roles: role}},
            {returnDocument: 'after'}
        ).select('login roles -_id').exec();
    }

    async deleteRole(login, role) {
        return User.findOneAndUpdate(
            {login},
            {$pull: {roles: role}},
            {returnDocument: 'after'}
        ).select('login roles -_id').exec();
    }

    async changePassword(password) {
        //TODO
        throw new Error('Not implemented');
    }

    async getUser(login) {
        return User.findOne({login}).exec()
    }
}

export default new UserRepository();