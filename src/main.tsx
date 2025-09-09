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
import NewsletterThankYou from "./routes/NewsletterThankYou";

// Admin Cms Route
import Dashboard from "./routes/admin-cms/dashboard/Dashboard-Admin";

// Admin Newsletter
import Newsletter from "./routes/admin-cms/newsletter/Newsletter-Admin";
import DetailNewsletter from "./routes/admin-cms/newsletter/Newsletter-Detail-Admin";
import EditNewsletter from "./routes/admin-cms/newsletter/Newsletter-Edit-Admin";

// Admin Contactq
import ContactAdmin from "./routes/admin-cms/contact/Contact-Admin";

// Admin Portfolio
import PortfolioAdmin from "./routes/admin-cms/portfolio/Portfolio-Admin";
import PortfolioEdit from "./routes/admin-cms/portfolio/Edit-Portfolio";


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
        <Route path="newsletters/:memberId/thank-you" element={<NewsletterThankYou />} />

        {/* Admin Cms Route */}
        <Route path="panels-admins/dashboard" element={<Dashboard />} />

        {/* Contact Admin */}
        <Route path="panels-admins/contacts" element={<ContactAdmin />} />
        
        {/* Newsletter Admin */}
        <Route path="panels-admins/newsletter" element={<Newsletter />} />
        <Route path="panels-admins/newsletter/:id" element={<DetailNewsletter />} />
        <Route path="panels-admins/newsletter/edit/:id" element={<EditNewsletter />} />

        {/* Profile Setting  */}
        <Route path="panels-admins/profile" element={<Profile />} />

        {/* Portfolio Admin */}
        <Route path="panels-admins/portfolios" element={<PortfolioAdmin />} />
        <Route path="panels-admins/portfolios/:id" element={<PortfolioAdmin />} />
        <Route path="panels-admins/portfolios/edit/:id" element={<PortfolioEdit />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
