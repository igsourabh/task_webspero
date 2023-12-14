import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useEffect } from "react";
const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "signin";
  };
  const data = localStorage.getItem("token");

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <AppBar style={{ width: "100vw" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/update" color="inherit">
            Profile
          </Button>
        </div>
        <div>
          {data !== null && (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
