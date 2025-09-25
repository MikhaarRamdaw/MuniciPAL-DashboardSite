import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Routes>
      {/* Landing page = Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Tickets page */}
      <Route path="/tickets" element={<Tickets />} />
    </Routes>
  );
}

export default App;
