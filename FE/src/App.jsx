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
    <div className="bg-green-400 px-10 h-lvh">
      <div>
        hissssssssssssss
      </div>

      <div>
        <input ref={fileInputRef} className=" bg-white border inline-block" type="file" onChange={(e)=>{
          setFile(e.target.files[0])
        }}/>
        <br />
        <div 
          className="mr-5 p-1 m-2 bg-yellow-200 border rounded px-3 inline-block" 
          onClick={async()=>{
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
            
          }}
        >
          upload
        </div>
      </div>
      <div>
        {files.map((ind,key)=>{
          return <div key={key} className="p-2 flex items-center justify-between mr-50 border my-1 bg-red-200 w-150 ">
            <div>
              <b>{key}{'. '}</b>  
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

            <div className="flex gap-4">

              <div  
                onClick={async()=>{
                  window.location.href="http://localhost:3000/file/download/"+ind
                }} 
                className="hover hover:bg-red-300 p-1 border bg-red-400 cursor-pointer"
              >
                <svg fill="#000000" className="" width="24" height="" viewBox="0 0 512 512" d24ata-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" data-iconid="343573" data-svgname="Download arrow down direction navigation arrows"><path d="M256,409.7,152.05,305.75,173.5,284.3l67.33,67.32V34h30.34V351.62L338.5,284.3,360,305.75ZM445.92,351v93.22a3.61,3.61,0,0,1-3.47,3.48H69.15a3.3,3.3,0,0,1-3.07-3.48V351H35.74v93.22A33.66,33.66,0,0,0,69.15,478h373.3a33.85,33.85,0,0,0,33.81-33.82V351Z"></path></svg>
              </div>
              <div 
                className="hover hover:bg-red-300 p-1 border bg-red-400 cursor-pointer"

                onClick={async(e)=>{
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
                }}
              >

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000" style={{ opacity: 1 }}><path  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                
              </div>
            </div>
          </div>
        })}
      </div>
    
    </div>
  )
}





export default App
