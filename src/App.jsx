import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dismissal from "./pages/Dismissal/Dismissal";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  return (
    <div className="AppWrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dismissal" element={<Dismissal />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
