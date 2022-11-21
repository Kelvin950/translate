import { useCallback, useState ,memo } from "react";

import useGoogleToken from '../hooks/usegoogleToken';


 function Main(){
// const [client, setClient]= useState({})

// console.log(client ,"main");
const [responseMain, setResponseMain] = useState([]);
const [loadingMain, setLoadingMain] = useState(false);
const [errorMain, setErrorMain] = useState(null);
const clb = (tokenResponse) => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=${process.env.REACT_APP_APIKEY}`;


    
      setLoadingMain(true);
    

    // cb([], true) ;
    console.log(tokenResponse);

    fetch( url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokenResponse.access_token,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("failed try again");
        }

        return res.json();
      })
      .then((res) => {
       
          setLoadingMain(false);
          setResponseMain(() => {
            return res["items"];

        })

        console.log(res);
      })
      .catch((err) => {
      
          setLoadingMain(false);
          setErrorMain(err);
        

        console.log(err);
      })
    
  };
let client; 
    useGoogleToken(clb).then((res)=>{

        client = res ; 
        console.log(client);
  }).catch((err)=>{
      setErrorMain(err) ;
  })
  
            
        console.log(responseMain);
           function  click(){
    
            
             client.requestAccessToken();
           console.log(client);
           } 
         
    
    
         
    
      return (
        <div>
          
               <button onClick ={click} > google</button>
                {responseMain.map((item ,index)=>{
                     return <div key={index}>
                      <p>{item.snippet.title}</p>
                      </div>

                })}
                {loadingMain && <p>Loading</p>}
                {errorMain && <p>error</p>}
        </div>
      )



}

export default Main;