import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import PrimaryButton from "../../Components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { MyProfile, UpdateProfile } from "../../redux/UsersSlice";
import { useState } from "react";
import swal from "sweetalert";
import "./style.css";
interface Location {
  latitude: any;
  longitude: any;
}
interface FormData {
  name: string;
  email: string;
  password?: string;
  phone: string;
  zipcode: string;
  profilePic: File | null;
  lat?: number | null;
  long?: number | null;
  location?: object | null;
}
const Update = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state: any) => state.users.Myprofile);
  const [imageupload, setimageupload] = useState(false);

  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    profilePic: null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error) {
      return swal(
        "Oops!",
        "plese turn on location permission for profile updating",
        "error"
      );
    }
    if (imageupload) {
      return swal("Oops!", "plese wait while image is uploading", "error");
    }
    dispatch(UpdateProfile(formData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const imagedetails = (element: any) => {
    const pics = element.target.files[0];
    if (pics === undefined) {
      alert("undefined");
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      setimageupload(true);
      data.append("file", pics);
      data.append("upload_preset", "chatapp");
      data.append("cloud_name", "sourabhvaish");
      fetch("https://api.cloudinary.com/v1_1/sourabhvaish/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ["profilePic"]: data.url,
          }));
          setimageupload(false);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    dispatch(MyProfile());

    return () => {};
  }, []);
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
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        zipcode: profileData.zipcode || "",
        profilePic: profileData.profilePic || "",
        lat: profileData.lat,
        long: profileData.long,
        location: profileData.location,
      });
    }
    if (location.latitude !== null) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        lat: location.latitude,
        long: location.longitude,
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
      }));
    }
  }, [profileData, location]);
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
      <Box sx={{ width: "40%", marginTop: 10 }}>
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar> */}
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoFocus
            value={formData.name}
            onChange={handleInputChange}
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
            value={formData.email}
            onChange={handleInputChange}
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
            value={formData.password}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="number"
            id="phone"
            autoComplete=""
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="zipcode"
            label="Zipcode"
            type="number"
            id="zipcode"
            autoComplete=""
            value={formData.zipcode}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="profilePic"
            type="file"
            id="profilePic"
            autoComplete=""
            inputProps={{
              accept: "image/*",
            }}
            onChange={imagedetails}
          />
          <PrimaryButton label={"Update"} />
        </Box>
      </Box>
    </Container>
  );
};

export default Update;
