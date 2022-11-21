import { useState } from "react";
import useGoogleToken from "../hooks/usegoogleToken";

export default function InputComponent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clb = (tokenResponse) => {
    // const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=${process.env.REACT_APP_APIKEY}`;

    setLoading(true);

    // cb([], true) ;
    console.log(tokenResponse);

    fetch(localStorage.getItem("input"), {
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
        setLoading(false);
        setResponse(() => {
          return res["items"];
        });

        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);

        console.log(err);
      });
  };
  let client;
  useGoogleToken(clb)
    .then((res) => {
      client = res;
      console.log(client);
    })
    .catch((err) => {
      setError(err);
    });

  function change(e) {
    console.log(e.target.value);
    setInput(e.target.value);
    localStorage.setItem(
      "input",
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${e.target.value.trim()}&key=${
        process.env.REACT_APP_APIKEY
      }`
     
    );
  }

  function callRequest(e) {
    e.preventDefault();
    if (!input) return;

    console.log(client);

    client.requestAccessToken();
  }

  return (
    <div>
      <form>
        <input type="text" onChange={change} />
        {loading ? (
          <span>Loading</span>
        ) : (
          <button onClick={callRequest}>Search</button>
        )}
      </form>
      {response.map((item ,index)=>{
                     return <div key={index}>
                      <p>{item.snippet.title}</p>
                      </div>

                })}
      {error && <p>error, Try again</p>}
    </div>
  );
}
