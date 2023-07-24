import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

const queryClient = new QueryClient();

function App() {
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
