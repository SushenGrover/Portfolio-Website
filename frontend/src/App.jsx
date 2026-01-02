// App.jsx
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Academics from "./pages/Academics";
import Design from "./pages/Design";
import Certifications from "./pages/Certifications";
import CollegeLife from "./pages/CollegeLife";
import Dsa from "./pages/Dsa";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import ContactFab from "./components/ContactFab";
import Internships from "./pages/Internships";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/academics" element={<Academics />} /> */}
        <Route path="/design" element={<Design />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/collegeLife" element={<CollegeLife />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dsa" element={<Dsa />} />
        <Route path="/internships" element={<Internships />} />
      </Routes>
      <ContactFab />
      <Footer />
    </Router>
  );
}

export default App;
