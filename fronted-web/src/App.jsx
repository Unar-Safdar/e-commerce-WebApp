import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx";
import Home from "./pages/HOme.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddProducts from "./pages/addProducts.jsx";
import Contact from "./pages/ContactUs.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sendmail" element={<Contact />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
              
            </ProtectedRoute>
          }
        />
          <Route
          path="//dashboard"
          element={
            <ProtectedRoute>
              <AddProducts />
              
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
