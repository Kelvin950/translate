import { useState, Fragment, useEffect } from "react";
import useGoogleToken from "./hooks/usegoogleToken";
import InputComponent from "./components/InputComponent";
import Main from "./components/Main";
import axios from 'axios';
import querystring from 'query-string';

export default function App() {
const [spotifyloaded ,setSpotifyLoaded ]= useState(false);
const [googleLoaded  , setGoogleLoaded] =  useState(false) ; 
const [userId , setUserId] =  useState("");
  useEffect(()=>{



    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      window.location.hash.s
      return hashParams;
    }


    const params =  getHashParams() ; 
    if(Object.entries(params).length>0 && Object.entries(params)[0].includes("access_token")){

    const {access_token}=  params; 
             
        axios.get("").then((res)=>{
          console.log(res);
        }).catch(err=>{console.log(err);})
    setGoogleLoaded(true);
      setSpotifyLoaded(true);
    localStorage.setItem("spotifyAccessToken" , access_token);
   
    console.log(googleLoaded);
  }
  });





  function setGoogleLoad(){
    
    setGoogleLoaded(false);
    console.log(2);

    
  }

// function setSpotify(){
//   setSpotifyLoaded(true);
// }




 async function spotify (){

  const res = 'https://accounts.spotify.com/authorize?'+ querystring.stringify({
    response_type: 'token',
   client_id: process.env.REACT_APP_SPOTIFYClIENTID,
  redirect_uri:process.env.REACT_APP_REDIRECTURL,
 scope:"playlist-modify-public playlist-modify-private"
  });

 window.location =  res;


 }


  


  //  setS(client);
  return (
    <Fragment>

   {spotifyloaded ||  <button onClick={spotify}>spotify</button>}
     <InputComponent />
      <Main setgoogle = {setGoogleLoad} spotify ={spotifyloaded} google={googleLoaded}/>
    </Fragment>
  );
}
