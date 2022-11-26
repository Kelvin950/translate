import { useState } from "react";
import axios  from 'axios';
import helper from '../util/helper'
import useGoogleToken from "../hooks/usegoogleToken";

export default function InputComponent({user , setgoogle, setLoad , spotify , google,  setError}) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);



  function change(e) {
    console.log(e.target.value);
    setInput(e.target.value);
    
  }
function createPlaylist(e) {
    e.preventDefault();
    if (!input) return;
        console.log(input); 
        const spotifyUri = [];           
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
        ).then((res1)=>{
          let titles = [];
          titles = res1.data.items.map((i) => {
            return i.snippet.title;
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
        
          return        Promise.all(promise);
        }).then((res) => {
    
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
          })
          .catch((err) => {
            console.log(err);
            // throw err.response.data;
             if(err.response.status ===401 || err.response.status === 403){
    
        setError("Spotify or google Authentication failed.Sign in again");
        setgoogle(); 
        spotify();
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
        <input type="text" onChange={change} />
        {loading ? (
          <span>Loading</span>
        ) : (
          <button onClick={createPlaylist}>Search</button>
        )}
      </form>
      {response.map((item ,index)=>{
                     return <div key={index}>
                      <p>{item.snippet.title}</p>
                      </div>

                })}
    
    </div>
  );
}
