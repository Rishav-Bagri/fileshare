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
          return <div key={key} onClick={async()=>{
            window.location.href="http://localhost:3000/file/download/"+ind
          }} className="p-2 flex justify-between mr-50 border my-1 bg-red-100 w-150 cursor-pointer">
            <div>
              {key}{' '}  
              {(()=>{
                let x=ind
                for(let i=0;i<x.length;i++){
                  if(x.charAt(i)=='-'){
                      x=x.substring(i+1)
                      break;
                  }
                }
                console.log(x);
                return x
                
              })()} 
            </div>
            <div onClick={async(e)=>{
              console.log(ind);
              e.stopPropagation()
              try {
                
                const response= await fetch('http://localhost:3000/file/delete/'+ind,{
                  method:"DELETE"
                })
                setFiles(files=>files.filter(f=>f!=ind))
              } catch (e) {
                console.log("erroe  "+e);
                
              }
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000" style={{ opacity: 1 }}><path  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
              
            </div>
          </div>
        })}
      </div>
    
    </div>
  )
}





export default App
