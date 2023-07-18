import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, fetchFeedbacks } from "../mock/mockFetch";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Groups, Person } from "@mui/icons-material";

export default function Feedbacks() {
  const {
    data: feedbacks,
    isLoading,
    isError,
  } = useQuery(["feedbacks"], fetchFeedbacks);

  const {
    data: employees,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useQuery(["employees"], fetchEmployees);

  console.log("FED UP YOU DID HUH?");

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: "3rem" }}>
      {feedbacks &&
        feedbacks.map((f) => (
          <Card key={f.id} sx={{ m: "1rem" }} color="success">
            <CardHeader
              title={
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Person /> {f.from}
                </Box>
              }
              subheader={
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Groups />
                  <Typography>{f.team}</Typography>

                  {employees &&
                    employees
                      .filter((e) => f.employees.includes(e.id))
                      .map((e) => (
                        <Chip key={e.id} label={e.name} size="small" />
                      ))}
                </Box>
              }
              action={
                <IconButton>
                  <Delete />
                </IconButton>
              }
              avatar={
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    value={f.grade * 10 * 2}
                    variant="determinate"
                    color={
                      f.grade > 3
                        ? "success"
                        : f.grade == 3
                        ? "warning"
                        : "error"
                    }
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {f.grade}
                    </Typography>
                  </Box>
                </Box>
              }
            />
            <CardContent>
              <Typography>{f.content}</Typography>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}
