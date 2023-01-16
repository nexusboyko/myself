import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home";
import Meditate from "./pages/meditate";
import Stretch from "./pages/stretch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/meditate" element={<Meditate />}></Route>
          <Route path="/stretch" element={<Stretch />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
