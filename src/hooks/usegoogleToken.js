import {useEffect ,useState} from 'react'


 export default function useGoogleToken(cb){

    const  [token , setToken] =  useState("") ; 
    const [stat , setstat] = useState(null);
        const  [error , setError] =  useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    //  const [client , setClient] =  useState(null);
// const  [client, setClient] = useState(null) ;
    useEffect(()=>{

        

        if (scriptLoaded) return undefined;
           console.log(2);
        
      function initClient() {
        if (!window.google || scriptLoaded) return;

        setScriptLoaded(true);
        try{
       const client =  window.google.accounts.oauth2.initTokenClient({
          client_id:process.env.REACT_APP_clientID,
          scope: "https://www.googleapis.com/auth/youtube.readonly",
          callback: (tokenResponse) => {
            // access_token = tokenResponse.access_token;
            // setToken(tokenResponse.access_token)
            // console.log(token)
            cb([], true) ;
            fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=${process.env.REACT_APP_APIKEY}`, {
          method:"GET" ,
          headers:{
            'Authorization' : 'Bearer ' + tokenResponse.access_token
          }
         
        }).then((res)=>{

          console.log(res);
          if(!res.ok){
              throw new Error("failed try again");
          }
        
          return res.json()

        }).then(res=>{

            
            cb(res["items"] , false) ;
          console.log(res);
        }).catch(err=>{
          cb([], false) ;
            setError(err) ; 
        })
            
        }
          },
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

    
    
    } , [scriptLoaded,cb])
    
      
    
     return new Promise((resolve ,reject)=>{
                 
        if(error){
            reject(error); 
        }


        resolve(stat)

     });
    }