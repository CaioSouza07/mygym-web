import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { TrainingProvider } from "./contexts/Training/TrainingProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <TrainingProvider>
        <AppRoutes />
      </TrainingProvider>
    </AuthProvider>
  );
}

export default App;
