import { useState, Fragment } from "react";
import useGoogleToken from "./hooks/usegoogleToken";
import InputComponent from "./components/InputComponent";
import Main from "./components/Main";
import axios from 'axios';
import querystring from 'query-string'
export default function App() {


 async function spotify (){

  const res = 'https://accounts.spotify.com/authorize?'+ querystring.stringify({
    response_type: 'token',
   client_id: process.env.REACT_APP_SPOTIFYClIENTID,
  redirect_uri:process.env.REACT_APP_REDIRECTURL,
 
  })

 window.location =  res;



 }


  


  //  setS(client);
  return (
    <Fragment>
    <button onClick={spotify}>spotify</button>
      <InputComponent/>
      <Main/>
    </Fragment>
  );
}
