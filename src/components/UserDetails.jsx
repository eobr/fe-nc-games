import React, { useState, useEffect, useRef } from "react";
import { fetchUserByUsername } from "../utils/api";

export default function UserDetails({ setUsername, username, isLoggedIn, setIsLoggedIn }) {
  const initialRender = useRef(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fetchUserByUsername(username).then((userInfo) => {
        console.log(userInfo);
        setUserData(userInfo);
        setIsLoggedIn(true);
      });
    }
  }, [username]);

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
    setUserData([]);
  };

  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setUsername(usernameInput);
    setUsernameInput("");
  };


  return (
    <div className="userDetails">
      {isLoggedIn ? (
        <>
          <img className="avatar" src={userData.avatar_url} alt="user avatar" />
          <p>{userData.name}</p>
          <p>{userData.username}</p>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        {/* SELL AN ITEM LINK */}
        </>
      ) : (
        <form className="login" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
            value={usernameInput}
          ></input>
          <button type='submit'>Login</button>
        </form>
      )}
    </div>
  );
}
