import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./components/homepage";
import NavbarPage from "./components/navbarpage";
import LoginPage from "./components/loginpage";
import RegisterPage from "./components/registerpage";
import PageNotFound from "./components/pageNotFound";
import PostEditPage from "./components/postEditPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("user_name"));
  }, []);
  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <div className="App">
        <NavbarPage loggedInUser={loggedInUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} />}
          />
          <Route path="/edit-post" element={<PostEditPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
