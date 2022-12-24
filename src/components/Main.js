import { useState, memo } from "react";
import axios from  'axios';
import useGoogleToken from "../hooks/usegoogleToken"; 
import helper from "../util/helper";

function Main({
  user,
  setgoogle,
  setLoad,
  spotify,
  google,
  setError,
  setLoading,
  setLoadingTofalse,
}) {
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
      })
      .finally(() => {
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

  async function createPlaylist(id, user) {
    const res1 = await axios.get(
      "https://youtube.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: "50",
          playlistId: id,
          key: process.env.REACT_APP_APIKEY,
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
    const spotifyUri = [];
    Promise.all(promise)
      .then((res) => {
        res.forEach((r) => {
          console.log(r);
          console.log(r.data.tracks.items, r.config.params.query);
          spotifyUri.push(
            this.getspotifyUri(r.data.tracks.items, r.config.params.query)
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
      })
      .catch((err) => {
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
      {google || <button onClick={click}> google</button>}
      <button onClick={createPlaylist.bind(this, "dsd", user)}>create</button>
      {google &&
        responseMain.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.snippet.title}</p>
              <button onClick={createPlaylist.bind(this, item.id, user)}>
                Create playlist
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default memo(Main);
