import { BrowserRouter, Routes, Route } from "react-router";
import GetStartedPage from "../pages/GetStartedPage";
import RegisterPage from "../pages/RegisterPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
