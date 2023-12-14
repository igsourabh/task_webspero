import Register from "./Pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signin from "./Pages/Signin";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Home from "./Pages/Home";
import Update from "./Pages/UpdateProfile";
import Navbar from "./Components/Navbar";



export default function App() {

  return (


    <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/update" element={<Update />} />
        </Route>
      </Routes>
    </Router>
  );
}
