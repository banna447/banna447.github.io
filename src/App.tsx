
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import Coaches from "./pages/Coaches";
import Competitions from "./pages/Competitions";
import Announcements from "./pages/Announcements";
import Verification from "./pages/Verification";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/players" element={
              <ProtectedRoute>
                <Layout>
                  <Players />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/coaches" element={
              <ProtectedRoute>
                <Layout>
                  <Coaches />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/competitions" element={
              <ProtectedRoute>
                <Layout>
                  <Competitions />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/announcements" element={
              <ProtectedRoute>
                <Layout>
                  <Announcements />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/verification" element={
              <ProtectedRoute>
                <Layout>
                  <Verification />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <Layout>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
