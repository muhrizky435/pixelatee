import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

// Publi Route
import Home from "./routes/Home";
import Service from "./routes/Service";
import PortoFolio from "./routes/Portfolio";
import PortoFolioDetail from "./routes/Portfolio-Detail";
import Contact from "./routes/Contact";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route index path="/" element={<Home />} />
        <Route path="services" element={<Service />} />
        <Route path="portfolio" element={<PortoFolio />} />
        <Route path="portfolio/:id" element={<PortoFolioDetail />} />
        <Route path="contact" element={<Contact />} />

        {/* Admin Cms Route */}

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
