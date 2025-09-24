import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { ModulesPage } from "./components/ModulesPage";
import { VRTrainingPage } from "./components/VRTrainingPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { DesktopOnlyScreen } from "./components/DesktopOnlyScreen";
import { Navigation } from "./components/Navigation";
import { LanguageProvider } from "./components/LanguageContext";
import { AlertProvider } from "./components/shared/AlertContext";
import { CommunicationProvider } from "./components/shared/CommunicationContext";
import { useIsMobile } from "./components/hooks/useIsMobile";

interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
  institutionType: "school" | "college";
}

interface AdminData {
  email: string;
  password: string;
  displayName?: string;
}

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(
    null,
  );
  const [adminData, setAdminData] = useState<AdminData | null>(
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  
  // Mobile detection hook
  const isMobile = useIsMobile(1024);

  const handleLogin = (data: UserData) => {
    setUserData(data);
    setIsLoggedIn(true);
    setIsAdminLoggedIn(false);
    // Set first login to true on initial login, false on subsequent navigation
    setIsFirstLogin(true);
  };

  const handleAdminLogin = (data: AdminData) => {
    // Check if user is on mobile - if so, don't allow admin login
    if (isMobile) {
      // Don't proceed with admin login on mobile
      return;
    }
    setAdminData(data);
    setIsAdminLoggedIn(true);
    setIsLoggedIn(false);
    setIsFirstLogin(true);
  };

  const handleAdminLogout = () => {
    setAdminData(null);
    setIsAdminLoggedIn(false);
    setIsFirstLogin(true);
    // Force light mode on logout
    document.documentElement.classList.remove("dark");
  };

  const handleLogout = () => {
    setUserData(null);
    setAdminData(null);
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsFirstLogin(true); // Reset for next login
    // Force light mode on logout
    document.documentElement.classList.remove("dark");
  };

  // Track navigation to mark subsequent visits as "Welcome back"
  React.useEffect(() => {
    if (isLoggedIn && isFirstLogin) {
      const timer = setTimeout(() => {
        setIsFirstLogin(false);
      }, 5000); // After 5 seconds, subsequent navigation will show "Welcome back"

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isFirstLogin]);

  return (
    <LanguageProvider>
      <AlertProvider>
        <CommunicationProvider>
          <Router>
            {!isLoggedIn && !isAdminLoggedIn ? (
              <LoginPage
                onLogin={handleLogin}
                onAdminLogin={handleAdminLogin}
              />
            ) : (
              <div className="min-h-screen bg-background text-foreground">
                {/* Show Navigation only for regular users, not admin */}
                {isLoggedIn && !isAdminLoggedIn && (
                  <Navigation
                    userData={userData}
                    onLogout={handleLogout}
                    isFirstLogin={isFirstLogin}
                  />
                )}

                {/* Admin Dashboard - Direct access for admin users (Desktop only) */}
                {isAdminLoggedIn ? (
                  isMobile ? (
                    <DesktopOnlyScreen onBack={handleAdminLogout} />
                  ) : (
                    <AdminDashboard
                      adminData={adminData}
                      onLogout={handleLogout}
                    />
                  )
                ) : (
                  /* Regular user routes */
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <LandingPage userData={userData} />
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <Dashboard userData={userData} />
                      }
                    />
                    <Route
                      path="/modules"
                      element={
                        <ModulesPage userData={userData} />
                      }
                    />
                    <Route
                      path="/vr-training"
                      element={<VRTrainingPage />}
                    />
                    {/* Block admin access for regular users */}
                    <Route
                      path="/admin"
                      element={<Navigate to="/" replace />}
                    />
                    <Route
                      path="/preview_page.html"
                      element={<Navigate to="/" replace />}
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/" replace />}
                    />
                  </Routes>
                )}
              </div>
            )}
          </Router>
        </CommunicationProvider>
      </AlertProvider>
    </LanguageProvider>
  );
}