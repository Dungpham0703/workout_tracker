import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <div className="">
          <Navbar/>
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About/>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
    
  );
}

export default App;
