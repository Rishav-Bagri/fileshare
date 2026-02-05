import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

function App() {
  const [files,setFiles]=useState([])
  const [file,setFile]=useState(null)
  const [reload,setReload]=useState(0)
  const fileInputRef=useRef(null)
  useEffect(()=>{
    async function fn(params) {
      try{

        const response=await fetch('http://localhost:3000/file/bulk')
        const file=await (await response.json()).file
        setFiles(file)
        console.log(file);
      }catch(e){
        console.log(e)
      }
      
    }
    fn()  

  },[reload])
  return (
    <div className="bg-green-400">
      <div>
        hissssssssssssss
      </div>

      <div>
        <input ref={fileInputRef} className="mx-3 bg-white border inline-block" type="file" onChange={(e)=>{
          setFile(e.target.files[0])
        }}/>
        <br />
        <div className="mr-5 m-1 rounded px-3 inline-block" onClick={async()=>{
          const form=new FormData()
          form.append("file",file)
          const response= await fetch('http://localhost:3000/file/upload',{
            method:"POST",
            body:form
          })
          console.log((await response.json()).msg);
          setFile(null)
          fileInputRef.current.value=""
          setReload(reload+1)
          
        }}>
          click
        </div>
      </div>
      <div>
        {files.map((ind,key)=>{
          return <div onClick={async()=>{
            window.location.href="http://localhost:3000/file/download/"+ind
          }} className="p-2 cursor-pointer">
            {key} {ind}
          </div>
        })}
      </div>
    
    </div>
  )
}

export default App
