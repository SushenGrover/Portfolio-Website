// App.jsx
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Certifications from "./pages/Certifications";
import Journey from "./pages/Journey";
import Algorithms from "./pages/Algorithms";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import ContactFab from "./components/ContactFab";
import Experience from "./pages/Experience";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/algorithms" element={<Algorithms />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
      <ContactFab />
      <Footer />
    </Router>
  );
}

export default App;
