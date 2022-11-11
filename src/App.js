import React, { useState, useEffect } from "react";
import ResultViewer from "./ResultViewer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Review from "./Review";
import PlacementViewer from "./PlacementViewer";
import Hero from "./Hero";
import Nav from "./Nav";
import "./styles.css";
import Docs from "./Docs";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/docs" element={<Docs />} />

          <Route path="/Result" element={<ResultViewer />} />
          <Route path="/about" element={<Review />} />
          <Route path="/placement" element={<PlacementViewer />} />
        </Routes>
        <div className="underline"></div>
        <p style={{ paddingTop: 20 }}>
          Made with 💟 by <b>KINFE</b>
        </p>
      </BrowserRouter>
    </div>
  );
}
