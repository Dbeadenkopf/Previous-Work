import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Counter from "./components/Counter";
import Movies from "./components/Movies";
import Fetch from "./components/Fetch";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="movies" element={<Movies />} />
        <Route path="fetch" element={<Fetch />} />
      </Routes>
    </div>
  );
};

export default App;
