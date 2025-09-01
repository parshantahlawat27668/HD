import { IUser } from "../models/user.model";

const sanitizeUser = (user) =>{
const sanitizeUser = user.toObject();
delete sanitizeUser.refreshToken;
delete sanitizeUser.email.otp;

return sanitizeUser;
}

export {sanitizeUser}