import {Router} from "express"
import { createNote, deleteNote, getNotes } from "../controllers/note.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(verifyJWT, getNotes);
router.route("/create").post(verifyJWT, createNote);
router.route("/delete/:noteId").delete(verifyJWT, deleteNote);

export default router;