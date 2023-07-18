import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Projects from "./components/Projects";
import Employees from "./components/Employees";
import { Typography } from "@mui/material";
import Feedbacks from "./components/Feedbacks";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Typography>This is home</Typography>} />
        <Route path="projects" element={<Projects />} />
        <Route path="employees" element={<Employees />} />
        <Route path="feedbacks" element={<Feedbacks />} />
      </Route>
    </Routes>
  );
}
