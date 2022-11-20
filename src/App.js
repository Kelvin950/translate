
import { useState  , Fragment} from 'react';
import useGoogleToken from './hooks/usegoogleToken'
import InputComponent from './components/InputComponent';


export default function App() {
const  [response , setResponse] = useState([]);
const [loading , setLoading] = useState(false); 
const  [error ,setError] =  useState(null);
let client;

      useGoogleToken((res , loading)=>{
               
        setLoading(loading) ; 
        setResponse(()=>{ 
          return res ;
        })

      }).then(res=>{
        
        client =  res ; 
        console.log(client);
      }).catch(err=>{
console.log(err);
setError(err);
      })
          
   
       function  click(){

              
         client.requestAccessToken();
       
       } 
     if(error){
       return <div>{error}</div>
     }
       if(loading){
         return <div>loading....</div>
       } 


       if(response.length> 0){
         console.log(response)
           return  <div>
             {
              response.map((item , i)=>{
             return <Fragment key={i}>
                      <img src={item.snippet?.thumbnails.default.url}/> 
                      <h1>{item.snippet?.title}</h1>
             </Fragment>
           })
             }
           </div>
         
        
       }

  return (
    <div>
       <InputComponent />
           <button onClick ={click} > google</button>

    </div>
  )
}