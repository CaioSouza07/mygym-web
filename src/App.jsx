import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { TrainingProvider } from "./contexts/Training/TrainingProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <TrainingProvider>
        <HelmetProvider>
          <AppRoutes />
        </HelmetProvider>
      </TrainingProvider>
    </AuthProvider>
  );
}

export default App;
