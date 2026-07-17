import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
// Layouts
import WebsiteApp from "@/lib/WebsiteApp.tsx";

// Public Pages (Standard React)
import HomePage from "@/pages/(website)/Home/page.tsx";
import SingIn from "@/components/Shared/singin";
import SingUp from "@/components/Shared/singup";
import PendingApproval from "@/components/Shared/pending-approval";

// Dashboard System (Refine)
import DashboardApp from "@/lib/DashboardApp.tsx";

// Global Providers
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { AuthProvider } from "@/providers/auth-context";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ========================================== */}
            {/* SYSTEM 1: WEBSITE */}
            <Route element={<WebsiteApp />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<SingIn />} />
              <Route path="/register" element={<SingUp />} />
            </Route>

            <Route path="/pending-approval" element={<PendingApproval />} />

            {/* ========================================== */}
            {/* SYSTEM 2: DASHBOARD   */}
            <Route path="/dashboard/*" element={<DashboardApp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;