import { useState } from "react";
import useGoogleToken from "../hooks/usegoogleToken";

export default function InputComponent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
    
    </div>
  );
}
