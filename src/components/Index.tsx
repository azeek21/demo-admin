import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/feedbacks");
  }, []);
  return (
    <Box>
      <Typography typography="h1">Welcome</Typography>
      <Typography typography="body">
        {" "}
        Made by{" "}
        <a
          href="https://github.com/azeek21"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          Azeek
        </a>{" "}
      </Typography>
    </Box>
  );
}
