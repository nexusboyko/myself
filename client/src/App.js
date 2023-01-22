import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/home";
import Meditate from "./pages/meditate";
import Stretch from "./pages/stretch";
import Quotes from "./pages/quotes.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/meditate" element={<Meditate />}></Route>
          <Route path="/stretch" element={<Stretch />}></Route>
          <Route path="/quotes" element={<Quotes />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
