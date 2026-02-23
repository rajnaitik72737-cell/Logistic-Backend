import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);
import { Routes, Route } from "react-router-dom";
import Vehicles from "./pages/Vehicles";

function App() {
  return (
    <Routes>
      <Route path="/vehicles" element={<Vehicles />} />
    </Routes>
  );
}

export default App;
