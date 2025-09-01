// src/utils/resend.ts
import {config} from "dotenv"
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
