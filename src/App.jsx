import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Navbar from "./components/Navbar";
import TripAssistant from "./components/TripAssistant";
import About from "./pages/About";
import Features  from "./pages/Features";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/tripassistant" element={<TripAssistant />} />
          <Route path="/features" element={<Features />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
