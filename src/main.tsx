import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import PortoFolio from "./routes/PortoFolio";
import Contact from "./routes/Contact";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Service />} />
        <Route path="portofolio" element={<PortoFolio />} />
        <Route path="contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
