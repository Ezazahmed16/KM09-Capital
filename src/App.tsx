import { BrowserRouter, Route, Routes } from "react-router";
import  "./app.css";
// Layouts
import WebsiteApp from "@/lib/WebsiteApp.tsx";

// Public Pages (Standard React)
import HomePage from "@/pages/(website)/Home/page.tsx";

// Dashboard System (Refine)
import DashboardApp from "@/lib/DashboardApp.tsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* ========================================== */}
          {/* SYSTEM 1: WEBSITE */}
          <Route element={<WebsiteApp />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* ========================================== */}
          {/* SYSTEM 2: DASHBOARD   */}
          <Route path="/dashboard/*" element={<DashboardApp />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;