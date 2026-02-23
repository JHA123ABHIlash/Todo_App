const express=require("express");
const {createTodo,getTodos,updateTodos,deletetodo} = require("../controller/todo.controller");
const router = express.Router();
const authenticate=require('../middleware/authorize');

router.post("/create",authenticate,createTodo);
router.get("/fetch",authenticate,getTodos);
router.put("/update/:id",authenticate,updateTodos);
router.delete("/delete/:id",authenticate,deletetodo);
module.exports= router;