import { useState } from "react";
import axios  from 'axios';
import helper from '../util/helper'
import useGoogleToken from "../hooks/usegoogleToken";

export default function InputComponent({user , setgoogle, setLoad , spotify , google,  setError}) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([
    {
      kind: "youtube#playlistItem",
      etag: "HlFavG0PV33v6dpfV_P90e60dN0",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy41NkI0NEY2RDEwNTU3Q0M2",
      snippet: {
        publishedAt: "2021-09-27T09:48:52Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "javascript runtime and engine",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/GGfUhYtF-Uc/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/GGfUhYtF-Uc/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/GGfUhYtF-Uc/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 0,
        resourceId: {
          kind: "youtube#video",
          videoId: "GGfUhYtF-Uc",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "1uqqkoWB5nbj-3DZln0RLMsWhTY",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy4yODlGNEE0NkRGMEEzMEQy",
      snippet: {
        publishedAt: "2021-09-27T09:48:59Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "Call stack 0",
        description: "Execution Context",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/-GjJp59gTdw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/-GjJp59gTdw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/-GjJp59gTdw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/-GjJp59gTdw/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/-GjJp59gTdw/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 1,
        resourceId: {
          kind: "youtube#video",
          videoId: "-GjJp59gTdw",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "QXWQdGbCoBEo7zjV5nCSgeqJoD4",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy4wMTcyMDhGQUE4NTIzM0Y5",
      snippet: {
        publishedAt: "2021-09-27T09:49:03Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "Call stack 1",
        description: "Call stack and execution context",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/D19QxI6mdn0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/D19QxI6mdn0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/D19QxI6mdn0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/D19QxI6mdn0/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/D19QxI6mdn0/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 2,
        resourceId: {
          kind: "youtube#video",
          videoId: "D19QxI6mdn0",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "ch3VUH_KUPp00uk6bPjxvFNzRBo",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy41MjE1MkI0OTQ2QzJGNzNG",
      snippet: {
        publishedAt: "2021-09-27T09:49:07Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "Web APIS",
        description: "Web APIS and their  uses",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/3sT5e3aknx8/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/3sT5e3aknx8/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/3sT5e3aknx8/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/3sT5e3aknx8/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/3sT5e3aknx8/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 3,
        resourceId: {
          kind: "youtube#video",
          videoId: "3sT5e3aknx8",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "fBerZEiLVnWs707rm9FhgQIGZi4",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy4wOTA3OTZBNzVEMTUzOTMy",
      snippet: {
        publishedAt: "2021-09-27T10:22:27Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "Event Loops and callback queues",
        description: "Call back queues and event loops",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 4,
        resourceId: {
          kind: "youtube#video",
          videoId: "WAehulumzsk",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "fBerZEiLVnWs707rm9FhgQIGZi4",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy4wOTA3OTZBNzVEMTUzOTMy",
      snippet: {
        publishedAt: "2021-09-27T10:22:27Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "Event Loops and callback queues",
        description: "Call back queues and event loops",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 4,
        resourceId: {
          kind: "youtube#video",
          videoId: "WAehulumzsk",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "fBerZEiLVnWs707rm9FhgQIGZi4",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy4wOTA3OTZBNzVEMTUzOTMy",
      snippet: {
        publishedAt: "2021-09-27T10:22:27Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "Event Loops and callback queues",
        description: "Call back queues and event loops",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 4,
        resourceId: {
          kind: "youtube#video",
          videoId: "WAehulumzsk",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "fBerZEiLVnWs707rm9FhgQIGZi4",
      id: "UEw3VzZOQ3hCTHpUVnVjVmtrWk1aSklWci1odno2bzFKUy4wOTA3OTZBNzVEMTUzOTMy",
      snippet: {
        publishedAt: "2021-09-27T10:22:27Z",
        channelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
        title: "Event Loops and callback queues",
        description: "Call back queues and event loops",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/WAehulumzsk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Denlin Baiden",
        playlistId: "PL7W6NCxBLzTVucVkkZMZJIVr-hvz6o1JS",
        position: 4,
        resourceId: {
          kind: "youtube#video",
          videoId: "WAehulumzsk",
        },
        videoOwnerChannelTitle: "Denlin Baiden",
        videoOwnerChannelId: "UC0V-c3_PtY42rnH9MBA3C3Q",
      },
    },
  ]);
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
        <div class="flex ">
          <div class="w-5/6">
            <input
              className=" bg-white p-5 w-full  mb-10 text-xl md:text-3xl text-black   rounded-full outline focus:outline-sky-600"
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
                className="w-full bg-white p-5  mb-10 ttext-xl md:text-3xl text-black   rounded-full outline-black ring-offset-2 ring ring-sky-600"
                onClick={findPlaylist}
              >
                Search
              </button>
            )}
          </div>
        </div>
      </form>
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
    </div>
  );
}
