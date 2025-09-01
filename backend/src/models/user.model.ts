import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "dotenv"
config();

interface IOtp {
  code?: string;
  expiresAt?: Date;
  attempts?: number;
}

interface IEmail {
  id: string;
  isVerified: boolean;
  otp?: IOtp;
}

export interface IUser extends Document {
  name: string;
  email: IEmail;
  DOB: Date;
  refreshToken?: string;

  // Methods
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: function (v: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: "Invalid email Id",
        },
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      otp: {
        code: { type: String },
        expiresAt: { type: Date },
        attempts: { type: Number, default: 0 },
      },
    },
    DOB: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: "Date of Birth cannot be in the future"
      }
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function (this: IUser): string {
  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      algorithm: "HS256",
    }
  );
};

userSchema.methods.generateRefreshToken = function (this: IUser): string {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      algorithm: "HS256",
    }
  );
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
