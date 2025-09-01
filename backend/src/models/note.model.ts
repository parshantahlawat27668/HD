import mongoose,{Schema, Document, Model} from "mongoose"

interface INote extends Document{
    user:mongoose.Types.ObjectId;
    title:string;
    note?:string;
}

const noteSchema = new Schema<INote>({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true
    },
    note:{
        type:String,
        default:"",
        trim:true
    }
},{timestamps:true});

const Note:Model<INote> = mongoose.model<INote>("Note",noteSchema);
export default Note;