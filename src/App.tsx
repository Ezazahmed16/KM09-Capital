import { BrowserRouter, Route, Routes } from "react-router";
import "@/App.css";

// Layouts
import WebsiteApp from "@/lib/WebsiteApp.tsx";

// Public Pages (Standard React)
import HomePage from "@/pages/(website)/Home/page.tsx";
import AboutPage from "@/pages/(website)/About/page.tsx";
import PoliciesPage from "@/pages/(website)/ServicesTerms/page.tsx";
import ContactPage from "@/pages/(website)/Contact/page.tsx";
import AllMembersPage from "@/pages/(website)/allmembers/page.tsx";
import GalleryPage from "@/pages/(website)/gallery/page.tsx";
import BlogPage from "@/pages/(website)/Blog/page.tsx";
import BlogDetailsPage from "@/pages/(website)/Blog/details.tsx";
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
              <Route path="/about" element={<AboutPage />} />
              <Route path="/allmembers" element={<AllMembersPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailsPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/contact" element={<ContactPage />} />
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