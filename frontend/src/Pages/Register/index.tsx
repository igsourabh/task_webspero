import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/PrimaryButton";
import { useDispatch } from "react-redux";
import { Signup } from "../../redux/UsersSlice";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
interface Location {
  latitude: any;
  longitude: any;
}
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error) {
      return swal(
        "Oops!",
        "plese turn on location permission for profile updating",
        "error"
      );
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      phone: Number(data.get("phone")),
      zipcode: Number(data.get("zipcode")),
      lat: location.latitude,
      long: location.longitude,
      location: {
        type: "point",
        coordinates: [location.longitude, location.latitude],
      },
    });
    dispatch(
      Signup({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        phone: Number(data.get("phone")),
        zipcode: Number(data.get("zipcode")),
        lat: location.latitude,
        long: location.longitude,
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
      })
    );
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
          swal("Oops!", error.message, "error");
          setError(true);
        }
      );
    } else {
    }
  }, []);
  useEffect(() => {
    const data = localStorage.getItem("token") as string;
    if (data) {
      navigate("/");
    }
    return () => {};
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        overflowX: "hidden",
      }}
      component="main">
      <CssBaseline />
      <Box sx={{ width: "40%" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="text"
            id="phone"
            autoComplete=""
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="zipcode"
            label="Zipcode"
            type="text"
            id="zipcode"
            autoComplete=""
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="profilepic"
            type="file"
            id="profilepic"
            autoComplete=""
            inputProps={{
              accept: "image/*",
            }}
          /> */}

          <PrimaryButton label={"Register"} />
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/">{"Already Have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
};

export default Register;
