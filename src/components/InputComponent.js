import {useCallback, useRef,useState} from 'react'
import  useGoogleToken from '../hooks/usegoogleToken';


export default function   InputComponent(){
const [input , setInput] =  useState(""); 
const [response , setResponse]= useState([]) ;
const  [loadingg , setLoading] =  useState(false);
    const searchValue =  useRef("") ; 

function change(){
    console.log(searchValue.current.value)
    setInput(searchValue.current.value);
}
const cb = (res , loading)=>{
                 
    setLoading(loading)
    console.log(res)
    setResponse(()=>{  

        return  res
    });
        console.log(loadingg);
console.log(response);

 }
    let client ; 
    useGoogleToken(useCallback((res , loading)=>{
               
        setLoading(loading) ; 
        setResponse(()=>{
          return res;
        })

      } ,[setLoading , setResponse])).then(res=>{
        
        client =  res ; 
        console.log(client);
      }).catch(err=>{
console.log(err);

      }) ; 

 function callRequest(e){
     e.preventDefault()
     client.requestAccessToken();
    //  setResponse(()=>{

    //     return [2];
    // })
    // // setLoading(true)
    // console.log(response  , loading);
 }




 
 if(response.length >0){
     console.log(response)
 } 
  
    return <div>


        <form>
            <input  type="text"   onChange={change}   ref = {searchValue}  />
            <button onClick={callRequest}>Search</button>
            }
        </form>


    </div>
}