import { useState } from "react";
import axios  from 'axios';
import helper from '../util/helper'
import useGoogleToken from "../hooks/usegoogleToken";
import { FcSearch } from "react-icons/fc";
export default function InputComponent({user , setgoogle, setLoad , spotify , google,  setError , googleFalse}) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(
  []);
  const [loading, setLoading] = useState(false);



  function change(e) {
    console.log(e.target.value);
    setInput(e.target.value);
    
  }
function findPlaylist(e) {
    e.preventDefault();
    if (!input) return;
        console.log(input); 
             
     axios.get(
          "https://youtube.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              maxResults: "50",
              playlistId: input,
              key: process.env.REACT_APP_APIKEY,
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("googleAccessToken"),
              Accept: "application/json",
            },
          }
        ).then(res=>{

          setResponse(()=>{
            return res.data.items ;
          })
        }).catch(err=>{
          console.log(err);
          // throw err.response.data;
           if(err.response.status ===401 || err.response.status === 403){
  
      setError("Spotify or google Authentication failed.Sign in again");
      localStorage.removeItem("spotifyAccessToken");
    localStorage.removeItem("googleAccessToken");
    // setgoogle(); 
    googleFalse();
    spotify();
    }else if(err.response.status  === 400 || err.response.status === 404){
  
      setError("Bad input.Try again");
  
    }
    else{
      setError("Failed.Try again");
    }
  
        });
  }


  function createPlaylist(){

    const spotifyUri = [];    
    let titles = [];
         
    titles =response.map((item) => {
      return item.snippet.title;
    });

    console.log(titles);
    
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
    console.log(promise);
        Promise.all(promise)
.then((res) => {

      res.forEach((r) => {
        console.log(r);
        console.log(r.data.tracks.items, r.config.params.query);
        spotifyUri.push(
          helper.getspotifyUri(r.data.tracks.items, r.config.params.query)
        );
      });
      console.log("done");
      console.log(spotifyUri);
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
      console.log(res);
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
              ? process.env.REACT_APP_IMGB
              : process.env.REACT_APP_IMGA,
        }),
      ];

      return Promise.all(promises);
    })
    .then((res) => {
      console.log(res);
      setError("done");
    }).catch(err=>{
      console.log(err.response.data);
      // throw err.response.data;
       if(err.response.status ===401 || err.response.status === 403){

  setError("Spotify or google Authentication failed.Sign in again");
  localStorage.removeItem("spotifyAccessToken");
  localStorage.removeItem("googleAccessToken");
  // setgoogle(); 
  spotify();
  googleFalse()
}else if(err.response.status  === 400 || err.response.status === 404){

  setError("Bad input.Try again");

}
else{
  setError("Failed.Try again");
}

    });
    
  }
  return (
    <div>
      <form>
        <div class="flex ">
          <div class="w-5/6">
            <input
              className=" bg-white p-5 w-full  mb-10 text-xl md:text-3xl text-black   rounded-full focus:outline-sky-600"
              type="text"
              placeholder="playlistId"
              onChange={change}
            />
          </div>
          <div class="w-1/9">
            {loading ? (
              <span>Loading</span>
            ) : (
              <button
                className="w-full  p-4  mb-10 text-xl md:text-3xl text-black   rounded-full border-none "
                onClick={findPlaylist}
              >
                <FcSearch className="text-6xl" />
              </button>
            )}
          </div>
        </div>
      </form>
      {response.length > 0 && (
        <div className="w-full  text-black text-3xl mb-10">
          <ul className="res overflow-auto ">
            {response.map((item, index) => {
              return (
                <li
                  className="p-7 pb-5 border-b-[0.01rem] text-xl md:text-2xl border-slate-400/10 border-solid text-sky-400"
                  key={index}
                >
                  {item.snippet.title}
                </li>
              );
            })}
          </ul>
          {response.length > 0 && (
            <button
              className="pt-6 w-full  mb-10 text-xl md:text-3xl text-black  pb-6 text-sky-400 hover:text-white"
              onClick={createPlaylist}
            >
              Create playlist
            </button>
          )}
        </div>
      )}
    </div>
  );
}
