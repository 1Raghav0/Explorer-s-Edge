import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Navbar from "./components/Navbar";
import TripAssistant from "./components/TripAssistant";
import About from "./pages/About";
import Features  from "./pages/Features";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";


const App = () => {

  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage  />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/tripassistant" element={<TripAssistant />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
          <Footer />
      </Router>
    </>
  );
};

export default App;
