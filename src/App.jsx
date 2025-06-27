import {BrowserRouter, Routes, Route,  } from "react-router-dom";
import "./App.css";
import Headers from "./Headers/Headers";
import Home from "./Pages/Home";
import Login from "./Pages/Login";  
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <>
    
      <BrowserRouter>
      <Headers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
