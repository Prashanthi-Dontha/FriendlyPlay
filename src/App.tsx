import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/Route/ProtectedRoute';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { GameRoomPage } from './pages/GameRoomPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/game/:id"
              element={
                <DashboardLayout>
                  <GameRoomPage />
                </DashboardLayout>
              }
            />
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
