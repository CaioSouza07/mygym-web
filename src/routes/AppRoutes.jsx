import { BrowserRouter, Routes, Route } from "react-router";
import GetStartedPage from "../pages/GetStartedPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
