import { BrowserRouter, Routes, Route } from "react-router";
import GetStartedPage from "../pages/GetStartedPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import ProfileMyAccountPage from "../pages/ProfileMyAccountPage";
import ProfilePreferencesPage from "../pages/ProfilePreferencesPage";
import WorkoutsPage from "../pages/WorkoutsPage";
import WorkoutsCreatePage from "../pages/WorkoutsCreatePage";
import EditTrainingPage from "../pages/EditTrainingPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/my-account"
          element={
            <ProtectedRoute>
              <ProfileMyAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/preferences"
          element={
            <ProtectedRoute>
              <ProfilePreferencesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <WorkoutsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workouts/new"
          element={
            <ProtectedRoute>
              <WorkoutsCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workouts/:id/edit"
          element={
            <ProtectedRoute>
              <EditTrainingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
