const express=require("express")
const fileRouter=require("./routes/file").fileRouter
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors())

app.use("/file",fileRouter)
app.get("/",(req,res)=>{
    res.json({msg:"hello"})
})

app.listen(3000,()=>{
    console.log("listening to port 3k")
})