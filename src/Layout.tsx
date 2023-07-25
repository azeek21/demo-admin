import { DarkMode as DarkModeIcon, Logout } from "@mui/icons-material";
import {
  AppBar,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  createTheme,
  Container,
  Toolbar,
  ThemeProvider,
  CssBaseline,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Auth from "./lib/auth";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("darkMode");
    if (mode && mode === "true") return true;
    return false;
  });
  const navigate = useNavigate();

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  async function handleLogout() {
    const loggedOutSuccess = await Auth.logout();
    if (loggedOutSuccess) {
      navigate('/login');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar sx={{ px: "1rem" }}>
        <Toolbar>
          <Stack direction="row" alignItems="center" width={"100%"}>
            <Navigation />
            <FormGroup sx={{ ml: "auto" }}>
              <FormControlLabel
                control={<Switch checked={darkMode} />}
                onClick={() => {
                  setDarkMode((mode) => !mode);
                  localStorage.setItem("darkMode", darkMode ? "false" : "true");
                }}
                label={
                  <IconButton>
                    <DarkModeIcon />
                  </IconButton>
                }
              />
            </FormGroup>
            <Button onClick={handleLogout} color="secondary">
              Logout <Logout />
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container>
        <Toolbar />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
