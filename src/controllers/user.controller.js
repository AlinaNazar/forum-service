import userService from "../services/user.service.js";

class UserController {

    async userRegister(req, res) {
        try {
            const user = await userService.userRegister(req.body);
            return res.status(201).json(user);
        } catch (err) {
            //TODO
            return console.log(err.message);
        }
    }

    async userLogin(req, res) {
        try {
            const user = await userService.userLogin(req.header);
            return res.json(user);
        } catch (err) {
            //TODO login
            return console.log(err.message);
        }

    }

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.userName);
            return res.json(user);
        } catch (err) {
            //TODO delete user
            return console.log(err.message);
        }

    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.userName, req.body);
            return res.json(user);
        } catch (err) {
            //TODO
            return console.log(err.message);
        }

    }

    async addRole(req, res) {
        try {
            const user = await userService.addRole(req.params.userName, req.params.role);
            return res.json(user);
        } catch (err) {
            //TODO
            return console.log(err.message);
        }
    }

    async deleteRole(req, res) {
        try {
            const user = await userService.deleteRole(req.params.userName, req.params.role);
            return res.json(user);
        } catch (err) {
            //TODO
            return console.log(err.message);
        }
    }

    async changePassword(req, res) {
        try {
            const user = await userService.changePassword(req.body);
            return res.sendStatus(204)
        } catch (err) {
            //TODO
            return console.log(err.message);
        }
    }

    async getUser(req, res) {
        try{
            const user = await userService.getUser(req.params.userName);
            return res.json(user);
        } catch(err){
            //TODO
            return console.log(err.message);
        }

    }
}

export default new UserController();