import {Router} from "express"
import { getUser, logout, sendSigninOtp, sendSignupOtp, verifySigninOtp, verifySignupOtp } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";


const router = Router();

router.route("/get-signup-otp").post(sendSignupOtp);
router.route("/verify-signup-otp").patch(verifySignupOtp);
router.route("/get-signin-otp").patch(sendSigninOtp);
router.route("/verify-signin-otp").patch(verifySigninOtp);
router.route("/logout").patch(verifyJWT,logout);
router.route("/get-user").get(verifyJWT,getUser);

export default router;