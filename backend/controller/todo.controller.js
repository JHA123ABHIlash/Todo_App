const Todo=require("../model/todo.model");


// CREATE NEW TODO.


const createTodo=async (req,res)=>{
    const todo=new Todo({
        text:req.body.text,
        completed:req.body.completed,
        user:req.user._id,  // Associate todo with logged user
    })

    try{
        const newTodo=await todo.save()
        res.status(201).json({message:"Todo Created Successfully",newTodo})
    }catch(err){
        console.log(err);
        res.status(401).json({message:"Error occuring in todo creation"})
          
    }
}


//ACCESS ALL TODOS.


const getTodos=async(req,res)=>{

    try{
        const todos=await Todo.find({user:req.user._id}); // fetch todos only for loggedin user.
        
        res.status(201).json({message:"Todo fetched Successfully",todos})
    }catch(err){
      console.log(err);
        res.status(401).json({message:"Error occuring in Get Todos"})
            
    }
}


//UPDATE TODOS.


const updateTodos=async(req,res)=>{
    try{
        const {id}=req.params;
        const todo=await Todo.findByIdAndUpdate(id,req.body,{new:true})

        res.status(201).json({message:"Todo Update Successfully",todo});
    }catch(err){
        console.log(err);
        res.status(401).json({message:"Error Occuring in Update Todos"});
    }
}


//DELETE TODOS.


const deletetodo=async(req,res)=>{
   try{
    const{id}=req.params;
    const todo=await Todo.findByIdAndDelete(id);
    if(!todo){
        return res.status(404).json({message:"Todo not found"});
    }
    res.status(201).json({message:"Todo Deleted!",todo});
   }catch(err){
    console.log(err);
    res.status(401).json({message:"Error occuring in Deleteing Todo"})
    
   }
}

module.exports= {createTodo,getTodos,updateTodos,deletetodo};