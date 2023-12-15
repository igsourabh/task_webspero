import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/UsersSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logout());
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
            <Button onClick={handelLogout} color="inherit">
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
