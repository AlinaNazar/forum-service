import {Router} from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.delete('/user/:userName', userController.deleteUser);
router.patch('/user/:userName', userController.updateUser);
router.patch('/user/:userName/role/:role', userController.addRole);
router.delete('/user/:userName/role/:role', userController.deleteRole);
router.patch('/password', userController.changePassword);
router.get('/user/:userName', userController.getUser);

export default router;
