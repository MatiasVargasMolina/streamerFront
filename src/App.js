import './App.css';
import React, { useState , useEffect} from 'react';
import io from "socket.io-client";

const socket=io("159.65.227.200:3001", {transports: ["websocket","polling"]} );
function App() {
  const [streamer1, setStreamers1]=useState("");
  const [streamer2, setStreamers2]=useState("");
  const [streamers, setStreamers]=useState([]);
  useEffect(() => {
    socket.on("server:loadstreamers", streamers=>setStreamers(streamers))
  }, [])
  function handleChange1(e){
    setStreamers1(e.target.value)
  } 
  function handleChange2(e){
    setStreamers2(e.target.value)
  } 
  function handleSubmit1(e){
    e.preventDefault();
    socket.emit("client:changestreamer1",streamer1);
  }
  function handleSubmit2(e){
    e.preventDefault();
    socket.emit("client:changestreamer2",streamer2)
  }
  if(streamers[0] !==undefined){
    console.log(streamers)
    return (
      <div className="app-container">
        <div className="container-stream">
          <div className="containerInput">
            <input type="text" className="input" name="streamer1" onChange={handleChange1} placeholder="nombre del streamer"/>
            <button className="button" onClick={handleSubmit1} type="submit">Cambiar</button>
          </div>
          <iframe
            src = {`https://trovo.live/embed/player?streamername=${streamers[0]}` }
            height="500"            
            frameborder="2"
            width="500"
            allowfullscreen="true">
          </iframe>
        </div>
        <div className="container-stream">
          <div className="containerInput">
            <input type="text" className="input" name="streamer2" onChange={handleChange2} placeholder="nombre del streamer"/>
            <button onClick={handleSubmit2} className="button" type="submit">Cambiar</button>
          </div>
          <iframe
            src = {`https://trovo.live/embed/player?streamername=${streamers[1]}` }
            height="500"            
            frameborder="2"
            width="500"
            allowfullscreen="true">
          </iframe>
        </div>
      </div>
    );
  }
  return(<div></div>)
}

export default App;
