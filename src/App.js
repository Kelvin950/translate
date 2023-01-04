import { useState, Fragment, useEffect } from "react";
import  Title from './components/Title'
import InputComponent from "./components/InputComponent";
import Main from "./components/Main";
import axios from 'axios';
import querystring from 'query-string';
import { useHistory } from "react-router-dom";
import { GrSpotify } from "react-icons/gr";
  import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
const [spotifyloaded ,setSpotifyLoaded ]= useState(false);
const [googleLoaded  , setGoogleLoaded] =  useState(false) ; 
const [userId , setUserId] =  useState({});
const [loadingMain, setLoadingMain] = useState(false);
const [errorMain, setErrorMain] = useState(null);
const [login , setLogin] =  useState(false);
const history = useHistory();


console.log(spotifyloaded);
function checkSpotifyLogin(){
  if(localStorage.getItem("spotifyAccessToken")){
           

      setLogin(true);

  }else{
    setLogin(false);
  }
}
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


// function checkAccess(){
//   if(localStorage.getItem("spotifyAccessToken") || localStorage.setItem("googleAccessToken")){

//     return true;
//   }
//   return false;
// }

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
          // setSpotifyLoaded(false);
          // setGoogleLoaded(false);
          setError("spotify Token expired.Require access again");
          ;})
    // setGoogleLoaded(true);
      // setSpotifyLoaded(true);
    localStorage.setItem("spotifyAccessToken" , access_token);
          history.push("/");
    // console.log(googleLoaded);
  }


  checkSpotifyLogin();
  }, [setGoogleLoaded ,setSpotifyLoaded]);



console.log(userId);

function setGoogleFalse(){
  setGoogleLoaded(false);
}
console.log(googleLoaded , "jknfjernfjenijrf")

  function setGoogleLoad(){
    
    setGoogleLoaded(!googleLoaded);
    console.log(2);
   
    
  }
console.log(googleLoaded);
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
    <div className="md:container md:mx-auto pt-20 pl-2 ">
      <Title />
      <div className="mb-6">
        {login || (
          <button
            className="w-full bg-green-700 p-5 mt-3 mb-10 text-xl md:text-3xl   rounded-full hover:bg-sky-700 hover:text-black"
            onClick={spotify}
          >
            <GrSpotify
              style={{ display: "inline" }}
              className="text-center text-black text-5xl pr-1"
            />
            spotify
          </button>
        )}
        {
          <InputComponent
            user={userId}
            setgoogle={setGoogleLoad}
            setLoad={setload}
            spotify={checkSpotifyLogin}
            google={googleLoaded}
            setError={setError}
            googleFalse={setGoogleFalse}
          />
        }
        <Main
          user={userId}
          setgoogle={setGoogleLoad}
          setLoad={setload}
          spotify={checkSpotifyLogin}
          google={googleLoaded}
          setError={setError}
          setLoading={setLoading}
          setLoadingTofalse={setLoadingTofalse}
          googleFalse={setGoogleFalse}
        />
             <ToastContainer/>
      </div>
    </div>
  );
}
