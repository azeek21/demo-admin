import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Groups, Person } from "@mui/icons-material";
import { getEmployee, getProject, getUser } from "../utils/utils";
import Fetch from "../lib/lib";

export default function Feedbacks() {
  const {
    data: feedbacks,
    isLoading: isFeedbacksLoading,
    isError: isFeedbacksError,
  } = useQuery(["feedbacks"], Fetch.getFeedbacks);

  const {
    data: employees,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useQuery(["employees"], Fetch.getEmployees);

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery(["users"], Fetch.getUsers);

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery(["projects"], Fetch.getProjects);

  const quertClient = useQueryClient();

  if (isUsersError || isProjectsError || isEmployeesError || isFeedbacksError) {
    return (
      <Box
        sx={{
          postition: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography typography={"h1"} color={"error"}>
          Something went wrong...
        </Typography>
      </Box>
    );
  }

  if (
    isFeedbacksLoading ||
    isEmployeesLoading ||
    isUsersLoading ||
    isProjectsLoading
  ) {
    return (
      <Box
        sx={{
          postition: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (feedbacks.length == 0) {
    return (
      <Box
        sx={{
          postition: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography typography={"h1"}>No Feedbacks.</Typography>
      </Box>
    );
  }

  return (
    <Container>
      {feedbacks &&
        feedbacks.map((f) => (
          <Card key={f.id} sx={{ m: "1rem" }} color="success">
            <CardHeader
              title={
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Person />{" "}
                  {getUser(users, f.userId)?.name || "User not found"}
                </Box>
              }
              subheader={
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Groups />
                  <Typography>
                    {getProject(projects, f.projectId)?.name ||
                      "Project not found"}
                  </Typography>

                  {f &&
                    f.employeeIds.map((e) => (
                      <Chip
                        key={e}
                        label={
                          getEmployee(employees, e)?.name ||
                          "Employee not found"
                        }
                        size="small"
                      />
                    ))}
                </Box>
              }
              action={
                <IconButton
                  onClick={async () => {
                    await Fetch.deleteFeedback(f.id);
                    quertClient.invalidateQueries(["feedbacks"]);
                  }}
                >
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
              <Typography>{f.comment}</Typography>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}
