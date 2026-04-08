import ResultData from "./pages/Result/resultData";
import InputPage from "./pages/Input/inputPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/result" element={<ResultData />} />
    </Routes>
  );
}

export default App;
