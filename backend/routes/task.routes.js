import express from "express";
import {addTask, deletetask, getTask, getTasks, updateTask} from "../controllers/task.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();



router.post("/",protect,addTask);
router.get("/",protect,getTasks);
router.get("/:id",protect,getTask);
router.put("/:id",protect,updateTask);
router.delete("/:id",protect,deletetask);


export default router;