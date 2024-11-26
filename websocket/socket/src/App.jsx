import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");
const [me, setMe] = useState(" ");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      console.log(socket.id);
      console.log(me)
      return () => {
        socket.disconnect();
      };
    });
socket.on("message",(data)=>{
  console.log(data)
})
    socket.on("Welcome", (s) => {
      console.log(s);
    });
  }, []);
  
  const handleForm = () => {
  
    console.log(me);
    socket.emit("message", me);
    setMe("");
  };

  return (
    <div>
        <input value={me} type="text" onChange={(e) => setMe(e.target.value)} />
        <button onClick = {handleForm}>submit</button>
     
      {me}
    </div>
  );
}

export default App;
