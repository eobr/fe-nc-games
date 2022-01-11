
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { useState } from "react";
import UserDetails from "./components/UserDetails";
import Reviews from "./components/Reviews";

function App() {

  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <BrowserRouter>
      <div className="App">
        <div className="topbar">
          <h1>Board Game Reviews</h1>
        </div>
      
        <UserDetails
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        setUsername={setUsername}
      />
      <Reviews/>
      </div>
    </BrowserRouter>
  );
}

export default App;
