import { IUser } from "../models/user.model";
import { ApiError } from "./apiError";



interface ITokenResponse {
    accessToken:string;
    refreshToken:string;
}

const tokenGenerator = async (user:IUser):Promise<ITokenResponse> =>{
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken, refreshToken}
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

export {tokenGenerator};