// App.jsx
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Certifications from "./pages/Certifications";
import Journey from "./pages/Journey";
import Algorithms from "./pages/Algorithms";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import ContactFab from "./components/ContactFab";
import Experience from "./pages/Experience";

function App() {
  return (
    <Router>
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
