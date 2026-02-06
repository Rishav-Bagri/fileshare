
const express=require("express")
const fs=require("fs")
const multer=require("multer")
const path='C:/Users/aecr/Desktop/project/sharing app/BE/videos'
const fileRouter=express.Router()
const diskStorage=multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null,path+"/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const upload=multer({storage:diskStorage})
fileRouter.get("/",(req,res)=>{
    res.json({msg:"hello from file"})
})
fileRouter.get("/bulk",async(req,res)=>{
        var file=[]
        console.log("hi");
        
        const f=await fs.promises.readdir(path);
        f.forEach(x => {
            
            file.push(x)
            console.log(x);
            
        });
        console.log(f);
        
        res.json({
            file
        })
})
fileRouter.get("/download/:id",(req,res)=>{
        const file=req.params.id
        
        const filePath=path+"/"+file
        res.download(filePath)

})

fileRouter.post("/upload",upload.single("file"),async(req,res)=>{
    console.log("hn bhyii")
    res.json({msg:"ok bhai dal gyi file"})
})

fileRouter.delete("/delete/:id",async(req,res)=>{
    const p=path+"/"+req.params.id
    try{
        fs.promises.unlink(p);
        res.json({msg:"msg deleted"})
    }catch(e){
        console.log(e);
        res.json({msg:"ni hua msg delete"+e})
        
    }
})



module.exports ={fileRouter}
