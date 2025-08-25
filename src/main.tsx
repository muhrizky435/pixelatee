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
import ContactCMS from "./routes/admin/ContactCMS";
import ProductCMS from "./routes/admin/ProductCMS";
import ServiceCMS from "./routes/admin/ServiceCMS";
import DetailContactCMS from "./routes/admin/DetailContactCMS";
import DetailProductCMS from "./routes/admin/DetailProductCMS";
import DetailServiceCMS from "./routes/admin/DetailServiceCMS";
import ClientCMS from "./routes/admin/ClientCMS";
import Blog from "./routes/Blog";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="services" element={<Service />} />
        <Route path="product" element={<Product />} />
        <Route path="contact" element={<Contact />} />
        <Route path="detail/:id" element={<DetailProduct />} />

        <Route path="auth" element={<Auth />} />
        <Route path="contactCMS" element={<ContactCMS />} />
        <Route path="productCMS" element={<ProductCMS />} />
        <Route path="serviceCMS" element={<ServiceCMS />} />
        <Route path="detailContactCMS/:id" element={<DetailContactCMS />} />
        <Route path="detailProductCMS/:id" element={<DetailProductCMS />} />
        <Route path="detailServiceCMS/:id" element={<DetailServiceCMS />} />
        <Route path="clientCMS" element={<ClientCMS />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
