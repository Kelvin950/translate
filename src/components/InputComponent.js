import { useState } from "react";
import axios from "axios";
import helper from "../util/helper";
import useGoogleToken from "../hooks/usegoogleToken";
import { FcSearch } from "react-icons/fc";
import { toast } from "react-toastify";
import { config } from "../config";
import "react-toastify/dist/ReactToastify.css";

export default function InputComponent({
  user,
  setgoogle,
  setLoad,
  spotify,
  google,
  setError,
  googleFalse,
}) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  function change(e) {
   
    setInput(e.target.value);
  }
  function findPlaylist(e) {
    e.preventDefault();
    if (!input) return;
    

    const id1 = toast.loading("Please wait...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    axios
      .get("https://youtube.googleapis.com/youtube/v3/playlistItems", {
        params: {
          part: "snippet",
          maxResults: "50",
          playlistId: input,
          key: "AIzaSyDsOAHNXL3O34Ivv0H7GtaYINaQMNDgYiw",
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("googleAccessToken"),
          Accept: "application/json",
        },
      })
      .then((res) => {
        toast.update(id1, {
          render: "Done",
          type: "success",
          isLoading: false,
        });
        setResponse(() => {
          return res.data.items;
        });
      })
      .catch((err) => {
       
        // throw err.response.data;
        if (err.response.status === 401 || err.response.status === 403) {
          toast.error(id1, {
            render: "Spotify or google Authentication failed.Sign in again",
            type: "error",
            isLoading: false,
          });
          localStorage.removeItem("spotifyAccessToken");
          localStorage.removeItem("googleAccessToken");
          // setgoogle();
          googleFalse();
          spotify();
        } else if (err.response.status === 400 || err.response.status === 404) {
          toast.error(id1, {
            render: "Bad input.Try again",
            type: "error",
            isLoading: false,
          });
        } else {
          toast.error(id1, {
            render: "Failed.Try again",
            type: "error",
            isLoading: false,
          });
        }
      });
  }

  function createPlaylist() {
    const id1 = toast.loading("Please wait...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const spotifyUri = [];
    let titles = [];

    titles = response.map((item) => {
      return item.snippet.title;
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
                ? config.REACT_APP_IMGB
                : undefined,
          }),
        ];

        return Promise.all(promises);
      })
      .then((res) => {
        // console.log(res);
        setError("done");
        toast.update(id1, {
          render: "Done",
          type: "success",
          isLoading: false,
        });
        // console.log(res)
      })
      .catch((err) => {
       

        toast.dismiss(id1 , {
          
        })
        
        const status = err.response.data.error.status;
      

        // throw err.response.data;
        if (status === 401 || status === 403) {
          // toast.error(id2, {
          //   render: "Spotify or google Authentication failed.Sign in again",
          //   type: "error",
          //   isLoading: false,
          // });
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
          // setgoogle();
          googleFalse();
          spotify();
        } else if (status === 400 || status === 404) {
          // toast.error(id2, {
          //   render: "Bad input.Try again",
          //   type: "error",
          //   isLoading: false,
          // });
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
        } else {
          // toast.error(id2, {
          //   render: "Failed.Try again",
          //   type: "error",
          //   isLoading: false,
          // });
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
  return (
    <div>
      <form>
        <div className="flex ">
          <div className="w-5/6">
            <input
              className=" bg-white p-5 w-full  mb-10 text-xl md:text-3xl text-black   rounded-full focus:outline-sky-600"
              type="text"
              placeholder="playlistId"
              onChange={change}
            />
          </div>
          <div className="w-1/9">
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
