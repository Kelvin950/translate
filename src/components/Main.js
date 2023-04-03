import { useState, memo } from "react";
import axios from  'axios';
import useGoogleToken from "../hooks/usegoogleToken"; 
import helper from "../util/helper";
  import {  toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import {config}  from '../config';

function Main({
  user,
  setgoogle,
  setLoad,
  spotify,
  google,
  setError,
  setLoading,
  setLoadingTofalse,
  googleFalse
}) {
  const [responseMain, setResponseMain] = useState([]);

  const clb = (tokenResponse) => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=AIzaSyDsOAHNXL3O34Ivv0H7GtaYINaQMNDgYiw`;

    const id = toast.loading("Please wait...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

   

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokenResponse.access_token,
        Accept: "application/json",
      },
    })
      .then((res) => {
        
        if (!res.ok) {
          throw new Error("failed try again");
        }

        return res.json();
      })
      .then((res) => {
        localStorage.setItem("googleAccessToken", tokenResponse.access_token);
           toast.update(id, {
             render: "Done",
             type: "success",
             isLoading: false, 
             
           });
     setResponseMain(() => {
          return res["items"];
        });
        setgoogle();

      
      })
      .catch((err) => {
        setgoogle();
         
        
        throw err;
      })
     
    // setLoading();
  };

  let client;
  useGoogleToken(clb)
    .then((res) => {
      client = res;
     
    })
    .catch((err) => {
      toast.error("Google Authentication failed try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

  function click() {
    client.requestAccessToken();
 
  }

  async function createPlaylist(id, user) {

    
    const id1 = toast.loading("Please wait...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    const res1 = await axios.get(
      "https://youtube.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: "50",
          playlistId: id,
          key: "AIzaSyDsOAHNXL3O34Ivv0H7GtaYINaQMNDgYiw",
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("googleAccessToken"),
          Accept: "application/json",
        },
      }
    );
    // if(res1.status !==200)throw new Error("Failed try again");
    // if(res1.status === 401 || res1.status === 403){
    //     const error = new Error("Google Auth failed");
    //     error.status =  res1.status;
    //     throw error;
    // }

    let titles = [];
    titles = res1.data.items.map((i) => {
      return i.snippet.title;
    });

  
    const promise = titles.map((title) => {
      return axios("https://api.spotify.com/v1/search", {
        params: {
          query: title.replace(/\W|_/g, ""),
          type: "track",
          limit: 5,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("spotifyAccessToken"),
        },
      });
    });

    const spotifyUri = [];
    Promise.all(promise)
      .then((res) => {
        res.forEach((r) => {
       
          spotifyUri.push(
            helper.getspotifyUri(r.data.tracks.items, r.config.params.query)
          );
        });
      
        return axios.post(
          `https://api.spotify.com/v1/users/${user.id}/playlists`,
          {
            name: "Translatewq",
            description: "Created with translate",
            public: false,
          },
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("spotifyAccessToken"),
              "Content-Type": "application/json",
            },
          }
        );
      })
      .then((res) => {
     
        const { id } = res.data;

        const promises = [
          axios.post(
            `https://api.spotify.com/v1/playlists/${id}/tracks`,
            { uris: spotifyUri, position: 0 },
            {
              headers: {
                Authorization:
                  "Bearer " + localStorage.getItem("spotifyAccessToken"),
              },
            }
          ),
          fetch(`https://api.spotify.com/v1/playlists/${id}/images`, {
            method: "PUT",
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("spotifyAccessToken"),
            },
            body:
              Math.random() * 10 > Math.random() * 10
                ? config.REACT_APP_IMGA
                : config.REACT_APP_IMGB,
          }),
        ];

        return Promise.all(promises);
      })
      .then((res) => {
       
   toast.update(id1, {
     render: "Done",
     type: "success",
     isLoading: false,
   });
      })
      .catch((err) => {
      
         toast.dismiss(id1, {});
          
             const status = err.response.data.error.status;
           
        // throw err.response.data;
         if(err.response.status ===401 || err.response.status === 403){

            //  toast.error(id1, {
            //    render: "Spotify or google Authentication failed.Sign in again",
            //    type: "error",
            //    isLoading: false,
            //  });
               const id2 = toast.error(
                 "Spotify or google Authentication failed.Sign in again",
                 {
                   position: "top-right",
                   autoClose: 5000,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   progress: undefined,
                   theme: "dark",
                 }
               );
    
    localStorage.removeItem("spotifyAccessToken");
    localStorage.removeItem("googleAccessToken");
    googleFalse();
    spotify();
  }else if(err.response.status  === 400 || err.response.status === 404){

      const id2 = toast.error("Bad input. Try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  }
  else{
   
    const id2 = toast.error("Failed. Try again", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

      });
  }
  // if(err.response.status ===401 || err.response.status === 403){

  //   setError("Spotify or google Authentication failed.Sign in again");
  //   setgoogle();

  // }else if(err.response.status  === 400 || err.response.status === 404){

  //   setError("Bad input.Try again");

  // }
  // else{
  //   setError("Failed.Try again");
  // }

  return (
    <div>
      {google || (
        <button
          className="w-full bg-white p-5  mb-10 text-xl md:text-3xl text-black   rounded-full hover:bg-orange-600 hover:text-black"
          onClick={click}
        >
          <FcGoogle
            style={{ display: "inline" }}
            className="text-center text-black"
         />
            
        
          oogle
        </button>
      )}
      {google && (
        <div>
          {
            <h1 className=" text-4xl sm:text-5xl text-zinc-400 lg:text-7xl text-center mb-20">
              Your playlist
            </h1>
          }

          {google && (
            <ul className="res">
              {responseMain.map((item, index) => {
                return (
                  <li
                    className="p-3 border-b-[0.01rem] text-xl md:text-2xl border-slate-400/10 border-solid text-sky-400"
                    key={index}
                  >
                    <p>{item.snippet.title}</p>

                    <button
                      className="p-3 w-full   text-xl md:text-3xl text-black   text-sky-400 hover:text-white"
                      onClick={createPlaylist.bind(this, item.id, user)}
                    >
                      Create playlist
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(Main);
