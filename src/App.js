import { useState, Fragment, useEffect } from "react";

import InputComponent from "./components/InputComponent";
import Main from "./components/Main";
import axios from 'axios';
import querystring from 'query-string';



export default function App() {
const [spotifyloaded ,setSpotifyLoaded ]= useState(false);
const [googleLoaded  , setGoogleLoaded] =  useState(false) ; 
const [userId , setUserId] =  useState({});
const [loadingMain, setLoadingMain] = useState(false);
const [errorMain, setErrorMain] = useState(null);




console.log(spotifyloaded);
useEffect(()=>{



    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
    
      return hashParams;
    }


    const params = getHashParams() ; 
    if(Object.entries(params).length>0 && Object.entries(params)[0].includes("access_token")){

    const {access_token}=  params; 
             
        axios.get("https://api.spotify.com/v1/me",{
          headers:{
            "Authorization":"Bearer "+access_token ,
            "Content-Type":"Application/json"
          }
        }).then((res)=>{
          console.log(res);
          
          setUserId((prev)=>{
            return {...prev ,...res.data }
          })
          
        }).catch(err=>{console.log(err)
          setSpotifyLoaded(false);
          setGoogleLoaded(false);
          setError("spotify Token expired.Require access again");
          ;})
    // setGoogleLoaded(true);
      setSpotifyLoaded(true);
    localStorage.setItem("spotifyAccessToken" , access_token);
 
    // console.log(googleLoaded);
  }
  }, [setGoogleLoaded ,setSpotifyLoaded]);



console.log(userId);

  function setGoogleLoad(){
    
    setGoogleLoaded(!googleLoaded);
    console.log(2);
   
    
  }

  function spotifyLoad(){
    setSpotifyLoaded(false);
  }
  function setload(){
    setLoadingMain(false);
  }
  function setLoading(){

    setLoadingMain(!loadingMain); 
  }

  function setLoadingTofalse(){

    if(loadingMain){
      setLoadingMain(false);
    }
  }

  function setError(msg){
    setErrorMain(msg);
  }

// function setSpotify(){
//   setSpotifyLoaded(true);
// }




 async function spotify (){

  setError(null);
  const res = 'https://accounts.spotify.com/authorize?'+ querystring.stringify({
    response_type: 'token',
   client_id: process.env.REACT_APP_SPOTIFYClIENTID,
  redirect_uri:process.env.REACT_APP_REDIRECTURL,
 scope:"playlist-modify-public playlist-modify-private ugc-image-upload"
  });

  
 window.location =  res;


 }


  console.log(process.env.REACT_APP_IMGA);
console.log(loadingMain);

  //  setS(client);
  return (
    <div className="center">

   {localStorage.getItem("spotifyAccessToken") ||  <button onClick={spotify}>spotify</button>}
      {  <InputComponent user={userId} setgoogle = {setGoogleLoad} setLoad = {setload} spotify ={spotifyLoad} google={googleLoaded}  setError={setError}/>}
      <Main  user={userId} setgoogle = {setGoogleLoad} setLoad = {setload} spotify ={spotifyLoad} google={googleLoaded}  setError={setError}  setLoading={setLoading} setLoadingTofalse = {setLoadingTofalse}/>
      {loadingMain && <p>Loading</p>}
      {errorMain && <p>{errorMain}</p>}
    </div>
  );
}
