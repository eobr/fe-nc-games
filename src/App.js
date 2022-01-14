import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import UserDetails from "./components/UserDetails";
import Reviews from "./components/Reviews";
import ReviewPage from "./components/ReviewPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  

  return (
    <BrowserRouter>
      <div className="App">
        <div className="topbar">
          <h1>Board Game Reviews</h1>
        </div>

        <UserDetails
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          userData={userData} setUserData={setUserData}          
        />
        <Routes>
          <Route path="/" element={<Reviews isLoggedIn={isLoggedIn}/>}></Route>
          <Route
            path="/reviews/:review_id"
            element={<ReviewPage isLoggedIn={isLoggedIn} userData={userData}/>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter> 
  );
}

export default App;
