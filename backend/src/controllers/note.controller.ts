import Note from "../models/note.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {Response, Request } from "express"



const createNote = asyncHandler(
   async (req:Request, res:Response):Promise<Response> =>{
    const {title, note} = req.body;
    const user = req.user;
    if(!title){
        throw new ApiError(400,"Title is required");
    }
    const noteData = {
        user:user._id,
        title,
        note
    }

    await Note.create(noteData);

    return res
    .status(201)
    .json(new ApiResponse(201,{}, "Note saved successfully"))

    }
);

const deleteNote = asyncHandler(
    async(req:Request, res:Response):Promise<Response> =>{
        const {noteId} = req.params;
        const user = req.user;

        if(!noteId){
            throw new ApiError(400,"Note id is missing");
        }

       const dbResponse =  await Note.deleteOne({_id:noteId});
       if(!dbResponse){
        throw new ApiError(400,"Failed to delete note");
       }
       const notes = await Note.find({user:user._id});
       return res
       .status(200)
       .json(new ApiResponse(200,{notes}, "Note deleted successfully"))
    }
);

const getNotes = asyncHandler(
    async (req:Request, res:Response):Promise<Response>=>{
        const user = req.user;
        const notes = await Note.find({user:user._id});
        
        return res
        .status(200)
        .json(new ApiResponse(200,{notes},"Notes fetched successfully"))
    }
);



export {
    createNote,
    deleteNote,
    getNotes
}