import { BrowserRouter, Routes, Route } from "react-router";
import GetStartedPage from "../pages/GetStartedPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
