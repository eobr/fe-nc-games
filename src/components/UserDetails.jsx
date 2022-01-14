import React, { useState, useEffect, useRef } from "react";
import { fetchUserByUsername } from "../utils/api";

export default function UserDetails({
  isLoggedIn,
  setIsLoggedIn,
  userData, setUserData
}) {
  const [usernameInput, setUsernameInput] = useState("");
  
  const [loginErr, setLoginErr] = useState("");


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
    fetchUserByUsername(usernameInput).then((userInfo) => {
      setUserData(userInfo);
      setIsLoggedIn(true);
      setUsernameInput("");
      setLoginErr("");
    })
    .catch(() => {
      setLoginErr("User not found!")
    })
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
          <button type="submit">Login</button>
          <p>{loginErr}</p>
        </form>
      )}
    </div>
  );
}
