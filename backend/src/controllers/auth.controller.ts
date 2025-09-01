import { Request, Response } from "express";
import otpGenerator from "otp-generator";
import User, { IUser } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { resend } from "../utils/resend";
import { tokenGenerator } from "../utils/tokenGenerator";
import { sanitizeUser } from "../utils/sanitizeUser";

// OTP generate function
const generateOTP = (): { otp: string; expiresAt: Date } => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  return { otp, expiresAt };
};

// Controllers
const sendSignupOtp = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { name, DOB, email }: { name: string; DOB: string; email: string } = req.body;

    if (!name || !DOB || !email) {
      throw new ApiError(400, "All fields are required.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }
    
    const dob = new Date(DOB);

    if(dob>= new Date()){
      throw new ApiError(400,"Date of Birth cannot be in the future");
    }

    
    const isExists: IUser | null = await User.findOne({ "email.id": email });

    if (isExists && isExists.email.isVerified) {
      throw new ApiError(400, `Email id already registered`);
    } else if (isExists && !isExists.email.isVerified) {
      await User.deleteOne({ "email.id": email });
    }

    const { otp, expiresAt } = generateOTP();

    const otpData = {
      code: otp,
      expiresAt: expiresAt,
    };

    const emailData = {
      id: email,
      otp: otpData,
    };

    const userData = {
      name,
      DOB:dob,
      email: emailData,
    };

    const user: IUser = await User.create(userData);

    await resend.emails.send({
      from: "HD <onboarding@resend.dev>",
      to: [email],
      subject: "Your Sign up OTP",
      html: `<p>Your OTP is : ${otp}</p>`
    });

    return res
      .status(201)
      .json(new ApiResponse(201, {}, "Otp code send successfully"));
  }
);

const verifySignupOtp = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new ApiError(400, "All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    const user = await User.findOne({ "email.id": email });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.email.isVerified) {
      throw new ApiError(400, "Email is already verified");
    }

    if (!user.email.otp?.expiresAt) {
      throw new ApiError(400, "Please Get otp first");
    }

    if (new Date(user.email.otp.expiresAt) <= new Date()) {
      throw new ApiError(400, "OTP expired");
    }

    if (user.email.otp?.code && user.email.otp?.code !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }

    user.email.isVerified = true;
    user.email.otp = undefined;

    const {accessToken, refreshToken} = await tokenGenerator(user);


    return res
      .status(200)
      .cookie("accessToken", accessToken, {httpOnly:true, secure:true, sameSite:"none", maxAge: 30 * 60 * 1000})
      .cookie("refreshToken", refreshToken, {httpOnly:true, secure:true, sameSite:"none", maxAge: 7 * 24 * 60 * 60 * 1000})
      .json(new ApiResponse(200, {}, "User sign up successfully"));
  }
);

const sendSigninOtp = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email id is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    const user = await User.findOne({ "email.id": email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!user.email.isVerified) {
      await User.deleteOne({ "email.id": email });
      throw new ApiError(400, "Email id is not verified Please sign up first");
    }

    const { otp, expiresAt } = generateOTP();

    const otpData = {
      code: otp,
      expiresAt: expiresAt,
    };
    console.log(otpData);
    user.email.otp = otpData;
    await user.save();
    console.log(user);
    await resend.emails.send({
      from: "HD <onboarding@resend.dev>",
      to: [email],
      subject: "Your Sign in OTP",
      html: `<p>Your OTP is : ${otp}</p>`
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Signin otp send successfully"))
  }
);

const verifySigninOtp = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { otp, email } = req.body;
    if (!otp || !email) {
      throw new ApiError(400, "All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    const user = await User.findOne({ "email.id": email });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!user.email.isVerified) {
      await User.deleteOne({ "email.id": email });
      throw new ApiError(400, "Email id is not verified Please sign up first");
    }
    console.log(user.email.otp);
    if (!user.email.otp?.expiresAt) {
      throw new ApiError(400, "Please Get otp first");
    }
    if (new Date(user.email.otp.expiresAt) <= new Date()) {
      throw new ApiError(400, "OTP expired");
    }
    if (user.email.otp.code !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }

    user.email.otp = undefined;
    
    const {accessToken, refreshToken} = await tokenGenerator(user);


    return res
      .status(200)
      .cookie("accessToken", accessToken, {httpOnly:true, secure:true, sameSite:"none", maxAge: 30 * 60 * 1000})
      .cookie("refreshToken", refreshToken, {httpOnly:true, secure:true, sameSite:"none", maxAge: 7 * 24 * 60 * 60 * 1000})
      .json(new ApiResponse(200, {}, "User Sign in successfully"))
  }
);

const logout = asyncHandler(
  async(req:Request, res:Response):Promise<Response> =>{
    const user = req.user;

    user.refreshToken = "";
    await user.save();

    return res
    .status(200)
    .clearCookie("accessToken",{httpOnly:true, secure:true, sameSite:"none"})
    .clearCookie("refreshToken",{httpOnly:true, secure:true, sameSite:"none"})
    .json(new ApiResponse(200,{},"User logout successfully"))
  }
);

const getUser = asyncHandler(
  async (req:Request, res:Response):Promise<Response> =>{
    console.log("count");
    const user= req.user;
    const responseUser = sanitizeUser(user);

    return res
    .status(200)
    .json(new ApiResponse(200,{user:responseUser},"User fetched successfully"))

  }
);

export {
  sendSigninOtp,
  sendSignupOtp,
  verifySigninOtp,
  verifySignupOtp,
  logout,
  getUser
}
