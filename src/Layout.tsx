import { DarkMode as DarkModeIcon } from "@mui/icons-material";
import {
  AppBar,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  Link as MuiLink,
  createTheme,
  Container,
  Toolbar,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("darkMode");
    if (mode && mode === "true") return true;
    return false;
  });

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

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
