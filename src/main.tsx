import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Home from "./routes/Home";
import About from "./routes/About";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="service" element={<h1>Service</h1>} />
        <Route path="product" element={<h1>Blog</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
