import {Router} from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.delete('/user/:login', userController.deleteUser);
router.patch('/user/:login', userController.updateUser);
router.patch('/user/:login/role/:role', userController.addRole);
router.delete('/user/:login/role/:role', userController.deleteRole);
router.patch('/password', userController.changePassword);
router.get('/user/:login', userController.getUser);

export default router;
