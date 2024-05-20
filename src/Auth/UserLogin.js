import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/countries");
    }
  }, [user]);

  const userData = {
    username: "admin",
    password: "admin123",
  };

  const [loginData, setLoginData] = useState();
  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    setTimeout(() => {
      if (loginData.user_name != userData.username) {
        setLoader(false);
        return setError("Login username incorrect");
      }
      if (loginData.user_password != userData.password) {
        setLoader(false);
        return setError("Login password incorrect");
      }
      const data = new FormData();
      data.append("user_name", loginData.user_name);
      data.append("user_password", loginData.user_password);
      data.append("token", "anm5890905kjfl");
      console.log("data", data);
      dispatch({
        type: "saveUser",
        payload: {
          data,
        },
      });
      setLoader(false);
      navigate("/countries");
    }, 3000);
  };

  const defaultTheme = createTheme();
  console.log("err", error);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && (
              <Alert className="mt-3" severity="error">
                {error}
              </Alert>
            )}
            <Box
              width={"25%"}
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={loginData?.user_name || ""}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    user_name: e.target.value,
                  });
                }}
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
                value={loginData?.user_password || ""}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    user_password: e.target.value,
                  });
                }}
              />
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Signin"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default UserLogin;
