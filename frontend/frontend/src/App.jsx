
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AIGenerator from "./components/AIGenerator"; 
import ChooseWritingMode from "./pages/ChooseWritingMode";
import AIpage from "./pages/AIpage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choose-mode" element={<ChooseWritingMode />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai" element={<AIGenerator />} />
        <Route path="/AIpage" element={<AIpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
[]