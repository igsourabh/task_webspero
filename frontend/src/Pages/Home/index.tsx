import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardComponent from "../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/UsersSlice";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.users.data);
  useEffect(() => {
    dispatch(getAllUsers());

    return () => {};
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Your App Name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh", // Make container take full height of the viewport
          margin: "auto",
          p: 14, // Center the container both horizontally and vertically
        }}
        maxWidth="xl">
        <Grid container spacing={2}>
          {data.map((e: any, index: number) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <CardComponent {...e} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
