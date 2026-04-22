import ResultData from "./pages/Result/resultData";
import InputPage from "./pages/Input/inputPage";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/About/aboutPage";
import ContactPage from "./pages/Contact/contactPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/result" element={<ResultData />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
