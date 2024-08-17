import express from "express";
import {addTask, deletetask, getTask, getTasks, updateTask} from "../controllers/task.controller.js";
const router=express.Router();



router.post("/",addTask);
router.get("/",getTasks);
router.get("/:id",getTask);
router.put("/:id",updateTask);
router.delete("/:id",deletetask);

export default router;