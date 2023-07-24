import { Box, Typography } from "@mui/material";

export default function Index() {
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
