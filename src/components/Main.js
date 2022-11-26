import {useState, memo } from "react";
import useGoogleToken from "../hooks/usegoogleToken";
import helper  from '../util/helper' ; 

function Main({ user, setgoogle, setLoad ,spotify, google ,setError,  setLoading,setLoadingTofalse }) {
  const [responseMain, setResponseMain] = useState([]);



  const clb = (tokenResponse) => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=${process.env.REACT_APP_APIKEY}`;
 
    setLoading();
      
    console.log(tokenResponse);

    fetch(url, {
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
        localStorage.setItem("googleAccessToken", tokenResponse.access_token);
       
        setResponseMain(() => {
          return res["items"];
        });
        setgoogle();
        
        console.log(res);
      })
      .catch((err) => {
        setgoogle();
        console.log(err);
        throw err;
      }).finally(()=>{
        setLoad();
        console.log(2);
      });
      // setLoading();
  };
  let client;
  useGoogleToken(clb)
    .then((res) => {
      client = res;
      console.log(client);
    })
    .catch((err) => {
      
      setError("Google Authentication failed try again");
    });

  console.log(responseMain);
  function click() {
    client.requestAccessToken();
    console.log(client);
  }

 function createPlaylist(id ,user) {
  
      helper.actions(id ,user).then((res)=>{
                 console.log(res);
      }).catch(err=>{
        console.log(err);
        // if(err.response.status ===401 || err.response.status === 403){

        //   setError("Spotify or google Authentication failed.Sign in again");
        //   setgoogle();


        // }else if(err.response.status  === 400 || err.response.status === 404){
          
        //   setError("Bad input.Try again");
             
        // }
        // else{
        //   setError("Failed.Try again");
        // }
      })
  
  }
 
  return (
    <div>
      {google || <button onClick={click}> google</button>}
        <button onClick={createPlaylist.bind(this , "dsd" , user)}>create</button>
      {google && responseMain.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.snippet.title}</p>
            <button onClick={createPlaylist.bind(this , item.id , user)}>Create playlist</button>
          </div>
        );
      })}
   
    </div>
  );
}

export default memo(Main);
