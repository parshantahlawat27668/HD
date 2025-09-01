import {config} from "dotenv";
import path from "path"
config({path:path.resolve(process.cwd(), ".env")});
import app from './app'
import dbConnection from "./db";

const PORT = process.env.PORT ? Number(process.env.PORT): 3000;


dbConnection()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running on Port : ",PORT);
    });
})
.catch(()=>{
    console.log("Error while connection db.");
})