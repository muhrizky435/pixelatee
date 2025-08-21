import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Product from "./routes/Product";
import Contact from "./routes/Contact";
import DetailProduct from "./routes/DetailProduct";
import Auth from "./routes/Auth";
import ContactCMS from "./routes/ContactCMS";
import ProductCMS from "./routes/ProductCMS";
import ServiceCMS from "./routes/ServiceCMS";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Service />} />
        <Route path="product" element={<Product />} />
        <Route path="contact" element={<Contact />} />
        <Route path="detail/:id" element={<DetailProduct />} />
        <Route path="auth" element={<Auth />} />
        <Route path="contactCMS" element={<ContactCMS />} />
        <Route path="productCMS" element={<ProductCMS />} />
        <Route path="serviceCMS" element={<ServiceCMS />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
