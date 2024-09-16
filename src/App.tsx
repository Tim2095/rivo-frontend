import { Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
