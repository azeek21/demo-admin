import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Router from "./Router";
import Auth from "./lib/auth";

const queryClient = new QueryClient();

function App() {
  const [darkMode, _] = useState(() => {
    const mode = localStorage.getItem("darkMode");
    if (mode && mode === "true") return true;
    return false;
  });

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          {/* <ThemeProvider theme={theme}> */}
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          {/* </ThemeProvider> */}
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
