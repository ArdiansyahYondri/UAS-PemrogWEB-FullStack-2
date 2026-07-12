import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline">Halaman Home</h1>
          }
        />
        {/* Kamu bisa tambah route lain di sini nanti */}
      </Routes>
    </Router>
  );
}

export default App;
