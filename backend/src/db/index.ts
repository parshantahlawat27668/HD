import {config} from 'dotenv'
config();
import mongoose from "mongoose"
import { dbName } from "../constants"

const URI= process.env.MONGO_URI as string;
if(!URI){
    throw new Error("MONGO_URI  is missing");
}
const dbConnection = async ():Promise<void> =>{
    try {
        const connectionInstance = await mongoose.connect(`${URI}/${dbName}`);
        console.log("Db connected successfully: ", connectionInstance.connection.host);      
    } catch (error) {
        console.log("error while connection db",error);
        process.exit();
    }
}


export default dbConnection;