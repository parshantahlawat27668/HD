import express, {Application} from 'express'
const app:Application = express();
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route"
import noteRouter from "./routes/note.route"
import { errorHandler } from './middlewares/errorHandler.middleware';

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options(/^\/.*$/, cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit:"16kb"
}));

app.use(express.urlencoded({extended:true, limit:"16kb"}));

app.use(cookieParser());

app.use(express.static("public"));

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/note",noteRouter);

app.use(errorHandler);


export default app;