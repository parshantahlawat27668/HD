import jwt,{JwtPayload} from "jsonwebtoken"
import {Response, Request, NextFunction} from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/apiError";
import User, { IUser } from "../models/user.model";


interface ITokenPayload extends JwtPayload{
    _id:string
}

export const verifyJWT = asyncHandler(
    async(req:Request, res:Response, next:NextFunction):Promise<void> =>{
        try {
            const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ","");

            if(!token){
                throw new ApiError(401,"Unauthorized request");
            }
            const tokenInfo = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string,
                {algorithms:["HS256"]}
            ) as ITokenPayload;
            const user:IUser | null = await User.findById(tokenInfo._id);
            if(!user){
                throw new ApiError(401,"Invalid access token");
            }

            req.user = user;
            next();

        } catch (error) {
            console.log(error);
            throw new ApiError(401, "Invalid access");
        }
    }
);

