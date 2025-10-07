import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

// ---Public Route
import Home from "./routes/user-public/Home";
import Service from "./routes/user-public/Service";
import PortoFolio from "./routes/user-public/Portfolio";
import PortoFolioDetail from "./routes/user-public/Portfolio-Detail";
import Contact from "./routes/user-public/Contact";
import NewsletterThankYou from "./routes/user-public/NewsletterThankYou";

{/* --------- */}
// ---Admin Cms Route
// Admin Auth
import Login from "./routes/admin-cms/auth/Auth-Login";
import Register from "./routes/admin-cms/auth/Auth-Register";

// Admin Dashboard
import Dashboard from "./routes/admin-cms/dashboard/Dashboard-Admin";

// Admin Newsletter
import Newsletter from "./routes/admin-cms/newsletter/Newsletter-Admin";
import EditNewsletter from "./routes/admin-cms/newsletter/Newsletter-Edit-Admin";

// Admin Portfolio
import PortfolioAdmin from "./routes/admin-cms/portfolio/Portfolio-Admin";
import PortfolioEdit from "./routes/admin-cms/portfolio/Portfolio-Edit-Admin";

// Admin Clients
import ClientsAdmin from "./routes/admin-cms/client/Client-admin";
import ClientEdit from "./routes/admin-cms/client/Client-Edit-Admin";

// Admin Contact
import ContactAdmin from "./routes/admin-cms/contact/Contact-Admin";

// Admin Profile-Setting
import Profile from "./routes/admin-cms/profile-setting/Profile-Admin";


{/* --------- */}
// --- Super Admin Route
// Super Admin Dashboard
import SuperAdminDashboard from "./routes/super-admin/Admin-List-SuperAdmin";
import AdminSuperAdmin from "./routes/super-admin/Admin-Add-SuperAdmin";
import AdminEditSuperAdmin from "./routes/super-admin/Admin-Edit-SuperAdmin";


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

        {/* --------- */}

        {/* Admin Cms Route */}
        {/* Auth Admin */}
        <Route path="panels-admins/auth-login" element={<Login />} />

        {/* Dashboard Admin */}
        <Route path="panels-admins/dashboard" element={<Dashboard />} />

        {/* Newsletter Admin */}
        <Route path="panels-admins/newsletter" element={<Newsletter />} />
        <Route path="panels-admins/newsletter/edit/:id" element={<EditNewsletter />} />

        {/* Portfolio Admin */}
        <Route path="panels-admins/portfolios" element={<PortfolioAdmin />} />
        <Route path="panels-admins/portfolios/:id" element={<PortfolioAdmin />} />
        <Route path="panels-admins/portfolios/edit/:id" element={<PortfolioEdit />} />

        {/* Client Admin */}
        <Route path="panels-admins/clients" element={<ClientsAdmin />} />
        <Route path="panels-admins/client/edit/:clientId" element={<ClientEdit />} />

        {/* Contact Admin */}
        <Route path="panels-admins/contacts" element={<ContactAdmin />} />

        {/* Profile Admin */}
        <Route path="panels-admins/profiles" element={<Profile />} />


        {/* --------- */}

        {/* Super Admin Route */}
        <Route path="panels-superadmins/list-admins" element={<SuperAdminDashboard />} />

        {/* Tambah Admin */}
        <Route path="panels-superadmins/add-admin" element={<AdminSuperAdmin />} />

        {/* Edit Admin Permission */}
        <Route path="/panels-superadmins/admins/:adminId/edit" element={<AdminEditSuperAdmin />} />

        {/* Register */}
        <Route path="panels-superadmins/auth-register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
