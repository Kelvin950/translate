import axios from 'axios';

     const helpers= {
        
        getspotifyUri(uriArray , query){
 

        const songObj = uriArray.find(song=>{
 
             if(query.includes(song.name.replace(/\W|_/g ,""))){
               return song.uri ;
             }else{
               return " ";
             }
             
           })
 
           return songObj.uri
           
          }
    ,
    
    async actions(id ,user){

        const res1=  await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems" , {
          params:{
            part:"snippet" ,
            maxResults:"50" ,
            playlistId:id,
            key:process.env.REACT_APP_APIKEY
          } ,headers:{
            "Authorization":"Bearer "+ localStorage.getItem("googleAccessToken"),
            "Accept":"application/json"
          }
        } ) ; 
        // if(res1.status !==200)throw new Error("Failed try again");
        // if(res1.status === 401 || res1.status === 403){
        //     const error = new Error("Google Auth failed");
        //     error.status =  res1.status;
        //     throw error;
        // }
        
     
        let titles= [];
            titles = res1.data.items.map((i)=>{
             return i.snippet.title ;
           }); 
         
           console.log(titles);
         
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
               spotifyUri.push(this.getspotifyUri(r.data.tracks.items ,r.config.params.query))
            })
            console.log("done");
            console.log(spotifyUri);
            return  axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`,{
              "name": "Translatewq",
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
            const {id}  =  res.data;
            
  
            const promises =  [axios.post(`https://api.spotify.com/v1/playlists/${id}/tracks` ,{"uris": spotifyUri,
            "position": 0} ,{
             headers:{
                "Authorization":"Bearer "+ localStorage.getItem("spotifyAccessToken"),
            
              }}) ,fetch(`https://api.spotify.com/v1/playlists/${id}/images` ,{
                method:"PUT" , 
                headers:{
                  "Authorization":"Bearer " + localStorage.getItem("spotifyAccessToken")
                } ,
                 body: (Math.random()* 10 > Math.random()*10) ? process.env.REACT_APP_IMGB:process.env.REACT_APP_IMGA
              }) ]
            
           return Promise.all(promises)
            
          }).then((res)=>{
            console.log(res);
          })
          .catch(err=>{console.log(err.response.data); throw err.response.data;})
       
  
      }
          
    };

    export default helpers;