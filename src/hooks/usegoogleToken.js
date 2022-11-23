import {useEffect ,useState ,useCallback} from 'react'


 export default function useGoogleToken(cb){

  

    const  [token , setToken] =  useState("") ; 

    const [stat , setstat] = useState(null);
        const  [error , setError] =  useState(null);
  
    const [scriptLoaded, setScriptLoaded] = useState(false);
    //  const [client , setClient] =  useState(null);
// const  [client, setClient] = useState(null) ;
    useEffect(()=>{
      
      // console.log(url);  
           
        if (scriptLoaded) return undefined;
          //  console.log(2);
       
  function initClient() {
        if (!window.google || scriptLoaded) return;

     
        setScriptLoaded(true);
        try{
          // console.log(url,"dsdsdsdsdsdd");  
       const client =  window.google.accounts.oauth2.initTokenClient({
          client_id:process.env.REACT_APP_clientID,
          scope: "https://www.googleapis.com/auth/youtube.readonly",
          callback: cb
          
          }
          
        );
         
        setstat(client);
        }catch
        (err){

            setError(err); 
        }
       
      }

      const script = document.createElement('script');

        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initClient;

        document.querySelector("body").appendChild(script);

        
      
        return ()=>{

            document.body.removeChild(script);
        }

    
    
    } , [scriptLoaded  ,cb ])
    
      
    
     return new Promise((resolve ,reject)=>{
                 
        if(error){
            reject(error); 
        }


        resolve(stat)

     });
    }