import React, { useState, useEffect, useRef } from "react";
import { fetchUserByUsername, fetchUsers } from "../utils/api";
//best wordle words: loans, RL.STEIN

export default function UserDetails({
  isLoggedIn,
  setIsLoggedIn,
  userData,
  setUserData,
}) {
  const [usernameInput, setUsernameInput] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const LOCAL_STORAGE_USER_DATA = "user-data";
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(LOCAL_STORAGE_USER_DATA, userData.username);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storedUsername = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
    if (storedUsername) {
      console.log(storedUsername);
      handleLogin(undefined, storedUsername);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
    setUserData(undefined);
    localStorage.setItem(LOCAL_STORAGE_USER_DATA, "");
  };

  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value);
  };

  const handleLogin = (event, username) => {
    if (event) event.preventDefault();
    if (!username) username = usernameInput;
    console.log(username);
    if (username !== ""){
    fetchUserByUsername(username)
      .then((userInfo) => {
        setUserData(userInfo);
        setIsLoggedIn(true);
        setUsernameInput("");
        setLoginErr("");
        localStorage.setItem(LOCAL_STORAGE_USER_DATA, userData.username);
      })
      .catch(() => {
        setLoginErr("User not found!");
      });
    }
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
          {/* <select onChange={handleUsernameChange}
            value={usernameInput}>
            {allUsers.map((user) => {
              return <option value={user.username}>{user.username}</option>
            })}
            </select> */}
          <button type="submit">Login</button>
          <p>{loginErr}</p>
        </form>
      )}
    </div>
  );
}
