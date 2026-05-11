import { BrowserRouter, Routes, Route } from "react-router";

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
