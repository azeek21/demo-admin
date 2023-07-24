import {
  FormControl,
  Box,
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Login as LoginIcon, Visibility } from "@mui/icons-material";
import { useState, ChangeEvent } from "react";
import Auth from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [loginError, setLoginError] = useState({ error: false, message: "" });
  const [isPasswordVisible, setIspasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setLoginData((old) => ({ ...old, [name]: value }));
  };

  const handleLogin = async () => {
    console.log("heyy");

    if (!loginData.login || !loginData.password) {
      setLoginError({
        error: true,
        message: "Login and password fields can't be empty",
      });
      return;
    }

    const success = await Auth.login(loginData);
    if (!success) {
      setLoginError({
        error: true,
        message: "Wrong login or password. \n Maybe check your connection too",
      });
      return;
    }
    navigate("/");
  };

  return (
    <Dialog open fullWidth>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Box p="1rem">
          <form
            style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
            onSubmit={(ev) => {
              ev.preventDefault();
              handleLogin();
            }}
          >
            <FormControl error={loginError.error} required>
              <InputLabel htmlFor="login-input">Login</InputLabel>
              <OutlinedInput
                id="login-input"
                value={loginData.login}
                onChange={handleChange}
                name="login"
                label="name"
                aria-errormessage="yee"
              />
            </FormControl>

            <FormControl error={loginError.error} required>
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <OutlinedInput
                id="password-input"
                label="password"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setIspasswordVisible((visibel) => !visibel);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>{loginError.message}</FormHelperText>
            </FormControl>
            <Button type="submit">
              Login
              <LoginIcon />
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
