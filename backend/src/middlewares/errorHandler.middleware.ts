import {Response, Request, NextFunction} from "express"
import { ApiError } from "../utils/apiError"

const errorHandler = (
    error:ApiError,
    req:Request,
    res:Response,
    next:NextFunction
):Response =>{
    return res.status(error.statusCode || 500)
    .json({
        success:error.success,
        message:error.message || "Internal server error",
        errors:error.errors || [],
        stack:process.env.NODE_ENV === "production" ? undefined : error.stack,
        data:error.data ?? null,
    })
}

export {errorHandler};