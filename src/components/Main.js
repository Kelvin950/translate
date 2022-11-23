import { useCallback, useState ,memo } from "react";
import axios from  'axios';
import useGoogleToken from '../hooks/usegoogleToken';
import querystring from 'query-string';
 

 function Main({setgoogle , spotify , google}){
// const [client, setClient]= useState({})

// console.log(client ,"main");
const [responseMain, setResponseMain] = useState([]);
const [loadingMain, setLoadingMain] = useState(false);
const [errorMain, setErrorMain] = useState(null);
const clb = (tokenResponse) => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=${process.env.REACT_APP_APIKEY}`;


    
      setLoadingMain(true);
           

    // cb([], true) ;
    console.log(tokenResponse);
      
    fetch( url, {
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
      //  console.log(setgoogle);
                       
      localStorage.setItem("googleAccessToken" ,tokenResponse.access_token)
          setLoadingMain(false);
          setResponseMain(() => {
            return res["items"];

        })

        console.log(res);
      })
      .catch((err) => {
     
          setLoadingMain(false);
          setErrorMain(err);
        

        console.log(err);
      })
    
  };
let client; 
    useGoogleToken(clb).then((res)=>{

        client = res ; 
        console.log(client);
  }).catch((err)=>{
      setErrorMain(err) ;
  })
  
             
        console.log(responseMain);
           function  click(){
    
            
             client.requestAccessToken();
           console.log(client);
           } 
         
    
    async  function createPlaylist(){

        try{

          actions() ; 
          
          } catch(err){
            console.log(err);
          setErrorMain(err);
        }

          // if(res.status !==200)throw new Error("failed try again or grant access to spotify");
          // console.log('add playlist now' ,res.data);
        }

        function getspotifyUri(uriArray , query){
 

          const songObj = uriArray.find(song=>{
   
               if(query.includes(song.name.replace(/\W|_/g ,""))){
                 return song.uri ;
               }else{
                 return " ";
               }
               
             })
   
             return songObj.uri
             
            }
      

    async function actions(){

      const res1=  await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems" , {
        params:{
          part:"snippet" ,
          maxResults:"50" ,
          playlistId:"RD9EHAo6rEuas",
          key:process.env.REACT_APP_APIKEY
        } ,headers:{
          "Authorization":"Bearer "+ localStorage.getItem("googleAccessToken"),
          "Accept":"application/json"
        }
      } ) ; 
      if(res1.status !==200)throw new Error("Failed try again");
      let titles= [];
          titles = res1.data.items.map((i)=>{
           return i.snippet.title ;
         }); 
        //  res1.data.items.for(i=>{
        //    titles.push(i.snippet.title) ;
        //  })
         console.log(titles);
        // console.log(res1.data.items.for);
        const promise =  titles.map((title)=>{

          return axios("https://api.spotify.com/v1/search", {
            params:{
              query:title.replace(/\W|_/g ,""), 
              type:"track",
              limit:5
            } ,headers:{
              "Authorization":"Bearer "+ localStorage.getItem("spotifyAccessToken") 
            }
          })
        }) ;
        console.log(promise);
        const spotifyUri =  [];
      Promise.all(promise).then((res)=>{
          res.forEach(r=>{
            console.log(r);
            console.log(r.data.tracks.items ,r.config.params.query);
             spotifyUri.push(getspotifyUri(r.data.tracks.items ,r.config.params.query))
          })
          console.log("done");
          console.log(spotifyUri);
          return  axios.post(`https://api.spotify.com/v1/users/go1fxxkdj2kalc0m20glg9zma/playlists`,{
            "name": "Translate",
            "description": "Created with translate",
            "public": false
          } ,{
            headers:{
              "Authorization":"Bearer "+ localStorage.getItem("spotifyAccessToken"),
              "Content-Type":"application/json"
            }
          })
        }).then((res)=>{
          console.log(res);
        })
        .catch(err=>{console.log(err); throw new Error("failed")})
        // console.log(spotifyUri);

      //  const searchwords =  titles.join("").split(" ").join("").replace(/\W|_/g ,"").replaceAll("OfficialMusicVideo", "")
      //  ;
      //  console.log(searchwords);
          
      //  const res2 =  await axios("https://api.spotify.com/v1/search" , {
      //    params:{
      //      query:searchwords, 
      //      type:"track",
      //      limit:50
      //    } ,headers:{
      //      "Authorization":"Bearer "+ localStorage.getItem("spotifyAccessToken") 
      //    }
      //  })
                
      //  console.log(res2.data);

    }
        
    
      return (
        <div>
          
            { google &&   <button onClick ={click} > google</button>}
          {responseMain.length>0  && <button onClick={createPlaylist}>Create playlist </button>}
                {responseMain.map((item ,index)=>{
                     return <div key={index}>
                      <p>{item.snippet.title}</p>
                      <button>Create playlist</button>
                      </div>

                })}
                {loadingMain && <p>Loading</p>}
                {errorMain && <p>error</p>}
        </div>
      )



}

export default memo(Main);