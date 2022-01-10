
import "./App.css";
import TopBar from "./components/TopBar";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TopBar/>
      </div>
    </BrowserRouter>
  );
}

export default App;
