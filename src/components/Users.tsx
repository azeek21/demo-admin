import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import CustomGrid from "./CustomGrid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Fetch from "../lib/lib";
import { getProject } from "../utils/utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "User",
    editable: true,
    minWidth: 200,
    flex: 1,
  },
];

export default function Users() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["users"], Fetch.getUsers);
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery(["projects"], Fetch.getProjects);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (user: User) => {
      await Fetch.deleteUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (e) => {
      alert(e);
    },
  });

  if (isError || isProjectsError) {
    return <Typography typography={"h1"}>Something went wrong</Typography>;
  }

  const dynamicColumns: GridColDef[] = [
    {
      field: "projectId",
      headerName: "Project",
      flex: 1,
      renderCell: (params) => {
        return (
          getProject(projects || [], params.row.projectId)?.name ||
          "Project not found"
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.3,
      getActions: (params: any) => [
        <GridActionsCellItem
          label="Delete"
          icon={<Delete />}
          onClick={() => {
            mutate.mutate(params.row);
          }}
        />,
      ],
      disableColumnMenu: true,
      hideSortIcons: true,
    },
  ];

  if (users?.length == 0) {
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
        <Typography typography={"h1"}>No Users.</Typography>
      </Box>
    );
  }

  return (
    <>
      <CustomGrid
        gridHash="users"
        columns={[...columns, ...dynamicColumns]}
        data={users}
        isLoading={isLoading || isProjectsLoading}
      />
    </>
  );
}
