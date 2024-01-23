import express from "express";
import UserController from "../controller/UserController";
import JwtService from "../services/JwtService";
import { authMiddleWare, authUserMiddleWare } from "../middleware/authMiddleware";
let router = express.Router();

router.post("/sign-up", UserController.signUp);
router.post("/sign-in", UserController.signIn);
router.get("/get-detail-user", authUserMiddleWare, UserController.getDetailUser);
router.put("/update-user", authUserMiddleWare, UserController.updateUser);
router.delete("/delete-user", authMiddleWare, UserController.deleteUser);

router.post("/refresh-token", JwtService.refreshTokenService);

module.exports = router;
